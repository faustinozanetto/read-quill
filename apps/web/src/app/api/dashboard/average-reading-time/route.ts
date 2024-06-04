import { prisma } from '@read-quill/database';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { auth } from 'auth';
import { DashboardAverageReadingTimeIntervalType } from '@modules/dashboard/types/dashboard.types';
import {
  format,
  isThisMonth,
  isThisWeek,
  isThisYear,
  isToday,
  isYesterday,
  startOfMonth,
  startOfWeek,
  subMonths,
  subWeeks,
} from 'date-fns';
import { AverageReadingTimeGetResponse } from '@modules/api/types/dashboard-api.types';

// /api/dashboard/average-reading-time GET : Gets the average reading time based on a interval
export async function GET(request: NextRequest): Promise<NextResponse<AverageReadingTimeGetResponse>> {
  try {
    const session = await auth();

    if (!session) {
      return new NextResponse('Unauthorized', { status: 403 });
    }

    const readRegistries = await prisma.readRegistry.findMany({
      where: {
        book: {
          readerId: session.user.id,
        },
      },
      select: { pagesRead: true, createdAt: true },
    });

    const TIME_PER_PAGE_MINUTES = 3;

    const getSemesterStart = (date: Date) => {
      const month = date.getMonth();
      const year = date.getFullYear();
      return new Date(year, month < 6 ? 0 : 6, 1);
    };

    const getSemesterKey = (date: Date) => {
      const semesterStart = getSemesterStart(date);
      return format(semesterStart, 'yyyy-MM');
    };

    const mappedRegistries = readRegistries.reduce<{
      currentDay: Record<string, number>;
      pastDay: Record<string, number>;
      currentWeek: Record<string, number>;
      pastWeek: Record<string, number>;
      currentMonth: Record<string, number>;
      pastMonth: Record<string, number>;
    }>(
      (acc, curr) => {
        const date = new Date(curr.createdAt);
        const dayKey = format(date, 'yyyy-MM-dd');
        const weekKey = format(startOfWeek(date, { weekStartsOn: 1 }), 'yyyy-MM-dd');
        const monthKey = format(startOfMonth(date), 'yyyy-MM');
        const semesterKey = getSemesterKey(date);

        if (isToday(date)) {
          acc.currentDay[dayKey] = (acc.currentDay[dayKey] || 0) + curr.pagesRead;
        } else if (isYesterday(date)) {
          acc.pastDay[dayKey] = (acc.pastDay[dayKey] || 0) + curr.pagesRead;
        }

        if (isThisWeek(date, { weekStartsOn: 1 })) {
          acc.currentWeek[weekKey] = (acc.currentWeek[weekKey] || 0) + curr.pagesRead;
        } else if (
          date >= startOfWeek(subWeeks(new Date(), 1), { weekStartsOn: 1 }) &&
          date < startOfWeek(new Date(), { weekStartsOn: 1 })
        ) {
          acc.pastWeek[weekKey] = (acc.pastWeek[weekKey] || 0) + curr.pagesRead;
        }

        if (isThisMonth(date)) {
          acc.currentMonth[monthKey] = (acc.currentMonth[monthKey] || 0) + curr.pagesRead;
        } else if (date >= startOfMonth(subMonths(new Date(), 1)) && date < startOfMonth(new Date())) {
          acc.pastMonth[monthKey] = (acc.pastMonth[monthKey] || 0) + curr.pagesRead;
        }

        return acc;
      },
      {
        currentDay: {},
        pastDay: {},
        currentWeek: {},
        pastWeek: {},
        currentMonth: {},
        pastMonth: {},
      }
    );

    const calculateAverage = (records: Record<string, number>): number => {
      const totalMinutes = Object.values(records).reduce(
        (total, pagesRead) => total + pagesRead * TIME_PER_PAGE_MINUTES,
        0
      );

      const totalDays = Math.max(Object.keys(records).length, 1);
      return totalMinutes / totalDays;
    };

    const readingTimes: AverageReadingTimeGetResponse['readingTimes'] = {
      daily: {
        current: calculateAverage(mappedRegistries.currentDay),
        past: calculateAverage(mappedRegistries.pastDay),
      },
      weekly: {
        current: calculateAverage(mappedRegistries.currentWeek),
        past: calculateAverage(mappedRegistries.pastWeek),
      },
      monthly: {
        current: calculateAverage(mappedRegistries.currentMonth),
        past: calculateAverage(mappedRegistries.pastMonth),
      },
    };

    return NextResponse.json({ readingTimes });
  } catch (error) {
    let errorMessage = 'An error occurred!';
    if (error instanceof Error) errorMessage = error.message;

    return new NextResponse(errorMessage, { status: 500 });
  }
}
