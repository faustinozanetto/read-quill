import { DashboardHasReadGetResponse } from '@modules/api/types/dashboard-api.types';
import { prisma } from '@read-quill/database';
import { auth } from 'auth';
import { endOfDay, startOfDay } from 'date-fns';
import { NextRequest, NextResponse } from 'next/server';

// /api/dashboard/has-read GET : Gets wether the user has read or not in the day.
export async function GET(request: NextRequest): Promise<NextResponse<DashboardHasReadGetResponse>> {
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

    const today = new Date();
    const start = startOfDay(today);
    const end = endOfDay(today);

    const readRegistries = await prisma.readRegistry.findMany({
      where: {
        book: { readerId: session.user.id },
        createdAt: {
          gte: start,
          lte: end,
        },
      },
    });

    const hasRead = readRegistries.length > 0;

    return NextResponse.json({ data: { hasRead } });
  } catch (error) {
    let errorMessage = 'An error occurred!';
    if (error instanceof Error) errorMessage = error.message;

    return NextResponse.json({ error: { message: errorMessage } }, { status: 500 });
  }
}
