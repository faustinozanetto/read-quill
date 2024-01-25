import { prisma } from '@read-quill/database';
import { getServerSession } from 'next-auth';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { authOptions } from '@modules/auth/lib/auth.lib';
import type { DashboardReadInsightsTimeDistributionGetResponse } from '@modules/api/types/api.types';

// /api/dashboard/read-insights/time-distribution GET : Gets the read time distribution of the user.
export async function GET(
  request: NextRequest
): Promise<NextResponse<DashboardReadInsightsTimeDistributionGetResponse>> {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse('Unauthorized', { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const groupSize = Number.parseInt(searchParams.get('group-size') ?? '30');

    const readRegistries = await prisma.readRegistry.findMany({
      where: { book: { readerId: session.user.id } },
    });

    const timeDistribution = readRegistries.reduce<Record<string, number>>((acc, registry) => {
      const registryDate = new Date(registry.createdAt);
      const roundedDate = new Date(
        Math.round(registryDate.getTime() / (groupSize * 60 * 1000)) * (groupSize * 60 * 1000)
      );
      const key = `${roundedDate.getHours()}:${roundedDate.getMinutes()}`;

      if (!acc[key]) {
        acc[key] = registry.pagesRead;
      } else {
        acc[key] += registry.pagesRead;
      }

      return acc;
    }, {});

    // Convert timeDistribution to an array of objects
    const timeDistributionArray = Object.entries(timeDistribution).map(([time, pagesRead]) => ({
      date: time,
      pagesRead,
    }));

    // Sort the timeDistributionArray by time
    const sortedTimeDistributionArray = timeDistributionArray.sort((a, b) => {
      const [aHour, aMinute] = a.date.split(':').map(Number);
      const [bHour, bMinute] = b.date.split(':').map(Number);

      if (aHour === bHour) {
        return aMinute - bMinute;
      }

      return aHour - bHour;
    });

    return NextResponse.json({ timeDistribution: sortedTimeDistributionArray });
  } catch (error) {
    let errorMessage = 'An error occurred!';
    if (error instanceof Error) errorMessage = error.message;

    return new NextResponse(errorMessage, { status: 500 });
  }
}
