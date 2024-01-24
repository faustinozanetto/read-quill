import { prisma } from '@read-quill/database';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '@modules/auth/lib/auth.lib';
import type { DashboardReadInsightsTimeDistributionGetResponse } from '@modules/api/types/api.types';

// /api/dashboard/read-insights/time-distribution GET : Gets the read time distribution of the user.
export async function GET(): Promise<NextResponse<DashboardReadInsightsTimeDistributionGetResponse>> {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse('Unauthorized', { status: 403 });
    }

    const readRegistries = await prisma.readRegistry.findMany({
      where: { book: { readerId: session.user.id } },
    });

    const timeDistribution = readRegistries.reduce<Record<string, number>>((acc, registry) => {
      const registryDate = new Date(registry.createdAt);
      const key = registryDate.toISOString().split('T')[1].split(':').slice(0, 2).join(':');

      if (!acc[key]) {
        acc[key] = registry.pagesRead;
      } else {
        acc[key] += registry.pagesRead;
      }

      return acc;
    }, {});

    // Sort the timeDistribution object by hour
    const sortedTimeDistribution = Object.fromEntries(
      Object.entries(timeDistribution).sort((a, b) => {
        const aDate = new Date(`1970-01-01T${a[0]}:00Z`);
        const bDate = new Date(`1970-01-01T${b[0]}:00Z`);
        return aDate.getTime() - bDate.getTime();
      })
    );

    return NextResponse.json({ timeDistribution: sortedTimeDistribution });
  } catch (error) {
    let errorMessage = 'An error occurred!';
    if (error instanceof Error) errorMessage = error.message;

    return new NextResponse(errorMessage, { status: 500 });
  }
}
