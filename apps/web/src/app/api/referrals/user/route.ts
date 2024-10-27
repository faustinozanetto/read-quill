import { ReferralsUserGetResponse } from '@modules/api/types/referrals-api.types';
import { prisma } from '@read-quill/database';
import { NextRequest, NextResponse } from 'next/server';

// /api/referrals/user GET : Gets user referral code if created.
export async function GET(request: NextRequest): Promise<NextResponse<ReferralsUserGetResponse>> {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        {
          error: {
            message: 'User ID is required!',
          },
        },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { referralCode: true },
    });
    if (!user) {
      return NextResponse.json(
        {
          error: {
            message: 'User not found!',
          },
        },
        { status: 404 }
      );
    }

    return NextResponse.json({ data: { referralCode: user?.referralCode } });
  } catch (error) {
    let errorMessage = 'An error occurred!';
    if (error instanceof Error) errorMessage = error.message;

    return NextResponse.json({ error: { message: errorMessage } }, { status: 500 });
  }
}
