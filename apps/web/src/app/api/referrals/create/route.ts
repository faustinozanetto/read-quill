import { ReferralsCreatePostResponse, ReferralsGetResponse } from '@modules/api/types/referrals-api.types';
import { REFERRALS_ACTIONS_VALIDATIONS_API } from '@modules/referrals/lib/referrals.validations';
import { Prisma, prisma } from '@read-quill/database';
import { auth } from 'auth';
import { NextRequest, NextResponse } from 'next/server';

// /api/referrals/create POST : Creates a referral code
export async function POST(request: NextRequest): Promise<NextResponse<ReferralsCreatePostResponse>> {
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

    const json = await request.json();
    const { userId, referralCode } = REFERRALS_ACTIONS_VALIDATIONS_API.CREATE.parse(json);

    if (session.user.id !== userId) {
      return NextResponse.json(
        {
          error: {
            message: 'Unauthorized!',
          },
        },
        { status: 403 }
      );
    }

    // Code already exists handling.
    const referralCodes = await prisma.user.findMany({
      where: {
        referralCode: { equals: referralCode },
      },
      select: {
        id: true,
      },
    });
    if (referralCodes.length > 0) {
      return NextResponse.json({ error: { message: 'Code already exists!' } }, { status: 400 });
    }

    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        referralCode,
      },
    });

    return NextResponse.json({ data: { referralCode } });
  } catch (error) {
    let errorMessage = 'An error occurred!';
    if (error instanceof Error) errorMessage = error.message;

    return NextResponse.json({ error: { message: errorMessage } }, { status: 500 });
  }
}
