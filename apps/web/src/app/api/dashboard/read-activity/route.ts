import { prisma } from '@read-quill/database';
import { NextResponse } from 'next/server';
import type { DashboardReadActivityGetResponse } from '@modules/api/types/dashboard-api.types';
import { auth } from 'auth';

// /api/dashboard/read-activity GET : Gets the user read activity
export async function GET(): Promise<NextResponse<DashboardReadActivityGetResponse>> {
  try {
    const session = await auth();

    if (!session) {
      return new NextResponse('Unauthorized', { status: 403 });
    }

    // Fetch read registries for the current page
    const readRegistries = await prisma.readRegistry.findMany({
      where: { book: { reader: { id: session.user.id } } },
    });

    const readActivity = readRegistries.reduce<Record<string, number>>((acc, cur) => {
      const { pagesRead, createdAt } = cur;
      const date = new Date(createdAt).toISOString().split('T')[0];

      if (!acc[date]) {
        acc[date] = pagesRead;
      } else {
        acc[date] += pagesRead;
      }

      return acc;
    }, {});

    return NextResponse.json({ readActivity });
  } catch (error) {
    let errorMessage = 'An error occurred!';
    if (error instanceof Error) errorMessage = error.message;

    return new NextResponse(errorMessage, { status: 500 });
  }
}
