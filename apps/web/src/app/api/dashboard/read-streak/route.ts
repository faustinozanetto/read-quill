import { DashboardReadStreakGetResponse } from '@modules/api/types/dashboard-api.types';

import { prisma } from '@read-quill/database';
import { auth } from 'auth';
import { differenceInDays, format } from 'date-fns';
import { NextRequest, NextResponse } from 'next/server';

const calculateStreak = (readRegistries: { createdAt: Date }[]) => {
  if (readRegistries.length === 0) return 0;

  let streakCount = 1;

  for (let i = 1; i < readRegistries.length; i++) {
    const currentDate = readRegistries[i].createdAt;
    const previousDate = readRegistries[i - 1].createdAt;

    // Check if the current date is the day before the previous date
    const daysDifference = differenceInDays(previousDate, currentDate);
    if (daysDifference <= 1) {
      streakCount++;
    } else {
      break;
    }
  }

  return streakCount;
};

// /api/dashboard/read-streak GET : Gets the read streak
export async function GET(request: NextRequest): Promise<NextResponse<DashboardReadStreakGetResponse>> {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json(
        {
          error: {
            message: 'You must be logged in!',
          },
        },
        { status: 403 }
      );
    }

    const { searchParams } = new URL(request.url);

    // Fetch read registries for the current page
    const readRegistries = await prisma.readRegistry.findMany({
      where: { book: { reader: { id: session.user.id } } },
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        createdAt: true,
        pagesRead: true,
        book: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    let streakCount = 0;
    if (readRegistries.length > 0) {
      streakCount = calculateStreak(readRegistries);
    }

    const selectedRegistries = readRegistries.slice(0, streakCount);
    const dedupedStreakCount = Object.keys(
      [...selectedRegistries].reduce<Record<string, boolean>>((acc, curr) => {
        const dateKey = format(curr.createdAt, 'yyyy-MM-dd');
        if (!acc[dateKey]) acc[dateKey] = true;

        return acc;
      }, {})
    ).length;

    // Format recent activity
    const readActivity = selectedRegistries.map((registry, index) => ({
      book: {
        id: registry.book.id,
        name: registry.book.name,
      },
      pagesRead: registry.pagesRead,
      dateRead: format(new Date(registry.createdAt), 'MMMM d, yyyy'),
    }));

    const totalPagesRead = selectedRegistries.reduce<number>((acc, curr) => acc + curr.pagesRead, 0);

    return NextResponse.json({ data: { readStreak: dedupedStreakCount, readActivity, totalPagesRead } });
  } catch (error) {
    let errorMessage = 'An error occurred!';
    if (error instanceof Error) errorMessage = error.message;

    return NextResponse.json({ error: { message: errorMessage } }, { status: 500 });
  }
}
