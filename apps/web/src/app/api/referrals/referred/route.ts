import { ReferralsReferredGetRespone } from '@modules/api/types/referrals-api.types';
import { prisma } from '@read-quill/database';
import { NextRequest, NextResponse } from 'next/server';

// /api/referrals/referred GET : Gets the referred users of a referral code
export async function GET(request: NextRequest): Promise<NextResponse<ReferralsReferredGetRespone>> {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');

    if (!code) {
      return NextResponse.json(
        {
          error: {
            message: 'Code is required!',
          },
        },
        { status: 400 }
      );
    }

    const pageIndex = Number.parseInt(searchParams.get('pageIndex') ?? '0');
    const pageSize = Number.parseInt(searchParams.get('pageSize') ?? '6');

    const users = await prisma.referral.findMany({
      where: {
        owner: {
          referralCode: { equals: code },
        },
      },
      skip: pageSize * pageIndex,
      take: pageSize,
      select: {
        referred: {
          select: {
            id: true,
            name: true,
            avatar: { select: { path: true } },
          },
        },
        createdAt: true,
      },
    });

    // Fetch the total count of books
    const totalCount = await prisma.referral.count({
      where: {
        owner: {
          referralCode: { equals: code },
        },
      },
    });

    // Calculate the total number of pages for pagination
    const pageCount = Math.ceil(totalCount / pageSize);
    const hasMore = pageIndex < pageCount - 1;

    return NextResponse.json({ data: { referredUsers: users, pageCount, hasMore } });
  } catch (error) {
    let errorMessage = 'An error occurred!';
    if (error instanceof Error) errorMessage = error.message;

    return NextResponse.json({ error: { message: errorMessage } }, { status: 500 });
  }
}
