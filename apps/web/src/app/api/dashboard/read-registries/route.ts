import { prisma } from '@read-quill/database';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { auth } from 'auth';
import { DashboardReadRegistriesGetResponse } from '@modules/api/types/dashboard-api.types';

// /api/dashboard/read-registries GET : Gets the read registries
export async function GET(request: NextRequest): Promise<NextResponse<DashboardReadRegistriesGetResponse>> {
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
    const pageIndex = Number.parseInt(searchParams.get('pageIndex') ?? '0');
    const pageSize = Number.parseInt(searchParams.get('pageSize') ?? '6');

    // Fetch read registries for the current page
    const readRegistries = await prisma.readRegistry.findMany({
      where: { book: { reader: { id: session.user.id } } },
      include: { book: { select: { pageCount: true, image: true, name: true } } },
      skip: pageSize * pageIndex,
      take: pageSize,
      cacheStrategy: { swr: 60, ttl: 60 },
    });

    // Fetch the total count of read registries
    const totalCount = await prisma.readRegistry.count({
      where: { book: { reader: { id: session.user.id } } },
    });

    // Calculate the total number of pages for pagination
    const pageCount = Math.ceil(totalCount / pageSize);

    return NextResponse.json({ data: { pageCount, readRegistries } });
  } catch (error) {
    let errorMessage = 'An error occurred!';
    if (error instanceof Error) errorMessage = error.message;

    return NextResponse.json({ error: { message: errorMessage } }, { status: 500 });
  }
}
