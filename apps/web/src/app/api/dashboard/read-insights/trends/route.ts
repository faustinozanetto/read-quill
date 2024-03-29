import type { ReadRegistry } from '@read-quill/database';
import { prisma } from '@read-quill/database';
import { getServerSession } from 'next-auth';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { startOfMonth, sub } from 'date-fns';
import { authOptions } from '@modules/auth/lib/auth.lib';
import type { DashboardReadInsightsReadTrendsIntervalType } from '@modules/dashboard/types/dashboard.types';
import type { DashboardReadInsightsTrendsGetResponse } from '@modules/api/types/dashboard-api.types';

const sortTrendsByDate = (trends: Record<string, ReadRegistry[]>): { date: string; registries: ReadRegistry[] }[] => {
  const sortedTrends: { date: string; registries: ReadRegistry[] }[] = Object.keys(trends)
    .sort((a, b) => new Date(a).getTime() - new Date(b).getTime())
    .map((key) => ({ date: key, registries: trends[key] }));

  return sortedTrends;
};

// /api/dashboard/read-insights/trends GET : Gets the read trends of the user
export async function GET(request: NextRequest): Promise<NextResponse<DashboardReadInsightsTrendsGetResponse>> {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse('Unauthorized', { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const interval = (searchParams.get('interval') ?? 'daily') as DashboardReadInsightsReadTrendsIntervalType;

    const readRegistries = await prisma.readRegistry.findMany({
      where: {
        book: { readerId: session.user.id },
        createdAt: {
          gte: startOfMonth(sub(new Date(), { weeks: 2 })),
        },
      },
    });

    const trends = sortTrendsByDate(
      readRegistries.reduce<Record<string, ReadRegistry[]>>((acc, trend) => {
        // Adjust the following logic based on your date structure
        const trendDate = new Date(trend.createdAt);
        const groupKey = calculateGroupKey(trendDate, interval);

        if (!acc[groupKey]) {
          acc[groupKey] = [trend];
        } else {
          acc[groupKey].push(trend);
        }

        return acc;
      }, {})
    );

    return NextResponse.json({ trends });
  } catch (error) {
    let errorMessage = 'An error occurred!';
    if (error instanceof Error) errorMessage = error.message;

    return new NextResponse(errorMessage, { status: 500 });
  }
}

const calculateGroupKey = (date: Date, interval: DashboardReadInsightsReadTrendsIntervalType): string => {
  switch (interval) {
    case 'daily':
      return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    case 'weekly': {
      const weekStartDate = new Date(date);
      weekStartDate.setDate(date.getDate() - date.getDay()); // Move to the start of the week
      return `${weekStartDate.getFullYear()}-${weekStartDate.getMonth() + 1}-${weekStartDate.getDate()}`;
    }
    case 'monthly':
      return `${date.getFullYear()}-${date.getMonth() + 1}`;
    default:
      return ''; // Handle unknown interval
  }
};
