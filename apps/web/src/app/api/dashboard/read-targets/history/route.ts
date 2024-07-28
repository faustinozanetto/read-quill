import { prisma } from '@read-quill/database';
import { NextRequest, NextResponse } from 'next/server';
import { auth } from 'auth';
import { DashboardReadTargetHistoryEntry, DashboardReadTargetsType } from '@modules/dashboard/types/dashboard.types.ts';
import { format, isThisWeek, startOfMonth, startOfWeek } from 'date-fns';
import { DashboardReadTargetsHistoryGetResponse } from '@modules/api/types/dashboard-api.types';

// /api/dashboard/read-targets/history GET : Gets the read targets of the use in history mode.
export async function GET(request: NextRequest): Promise<NextResponse<DashboardReadTargetsHistoryGetResponse>> {
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
    const interval = searchParams.get('interval') as DashboardReadTargetsType | null;

    if (!interval) {
      return NextResponse.json(
        {
          error: {
            message: 'Interval is required!',
          },
        },
        { status: 400 }
      );
    }

    const cursor = searchParams.get('cursor');
    const pageSize = Number.parseInt(searchParams.get('pageSize') ?? '10');

    if (!interval) {
      return NextResponse.json(
        {
          error: {
            message: 'Interval is required!',
          },
        },
        { status: 400 }
      );
    }

    const readTargets = await prisma.readTargets.findUnique({
      where: { userId: session.user.id },
    });
    if (!readTargets) {
      return NextResponse.json(
        {
          error: { message: 'User did not create read targets!' },
        },
        { status: 404 }
      );
    }

    // We now fetch the read registries in order to calculate current status of read targets.
    const readRegistries = await prisma.readRegistry.findMany({
      where: { book: { readerId: session.user.id } },
      select: { id: true, createdAt: true, pagesRead: true },
      orderBy: { createdAt: 'desc' },
      take: pageSize,
      skip: cursor ? 1 : 0,
      cursor: cursor ? { id: cursor } : undefined,
    });

    const hasMore = readRegistries.length === pageSize;
    const nextCursor = hasMore ? readRegistries[readRegistries.length - 1].id : null;

    const targets: Record<DashboardReadTargetsType, number> = {
      daily: readTargets.daily,
      weekly: readTargets.weekly,
      monthly: readTargets.monthly,
    };

    const groupedRegistries = readRegistries.reduce<Record<string, DashboardReadTargetHistoryEntry>>((acc, curr) => {
      const date = new Date(curr.createdAt);

      let key: string = '';
      if (interval === 'daily') key = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
      else if (interval === 'weekly') {
        const weekStartDate = new Date(date);
        weekStartDate.setDate(date.getDate() - date.getDay()); // Move to the start of the week
        key = `${weekStartDate.getFullYear()}-${weekStartDate.getMonth() + 1}-${weekStartDate.getDate()}`;
      } else if (interval === 'monthly') {
        key = `${date.getFullYear()}-${date.getMonth() + 1}`;
      }

      const currenTarget = targets[interval];
      if (acc[key]) {
        acc[key] = {
          date: key,
          value: acc[key].value + curr.pagesRead,
          progress: +(((acc[key].value + curr.pagesRead) / currenTarget) * 100).toFixed(2),
        };
      } else {
        acc[key] = { date: key, value: curr.pagesRead, progress: +((curr.pagesRead / currenTarget) * 100).toFixed(2) };
      }

      return acc;
    }, {});

    const historyEntries: DashboardReadTargetHistoryEntry[] = Object.values(groupedRegistries);

    return NextResponse.json({ data: { historyEntries, readTargets: targets, hasMore, nextCursor } });
  } catch (error) {
    let errorMessage = 'An error occurred!';
    if (error instanceof Error) errorMessage = error.message;

    return NextResponse.json({ error: { message: errorMessage } }, { status: 500 });
  }
}
