import { ReferralsChangePostResponse } from '@modules/api/types/referrals-api.types';
import { REFERRALS_ACTIONS_VALIDATIONS_API } from '@modules/referrals/lib/referrals.validations';
import { prisma } from '@read-quill/database';
import { auth } from 'auth';
import { NextRequest, NextResponse } from 'next/server';

// /api/referrals/change POST : Changes a referral code
export async function POST(request: NextRequest): Promise<NextResponse<ReferralsChangePostResponse>> {
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
    const { referralCode } = REFERRALS_ACTIONS_VALIDATIONS_API.CHANGE.parse(json);

    const ownReferralCode = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
      select: {
        referralCode: true,
      },
    });

    // Check for own code usage.
    if (ownReferralCode?.referralCode === referralCode) {
      return NextResponse.json({ error: { message: 'You can not user your own code!' } }, { status: 400 });
    }

    const referralCodes = await prisma.user.findMany({
      where: {
        referralCode: { equals: referralCode },
      },
      select: {
        id: true,
      },
    });

    // Referral code not found.
    if (referralCodes.length === 0) {
      return NextResponse.json({ error: { message: 'Referral Code not found!' } }, { status: 404 });
    }

    // Delete existing referral code use.
    await prisma.referral.deleteMany({
      where: {
        referred: {
          id: session.user.id,
        },
      },
    });

    // Create link
    await prisma.referral.create({
      data: {
        referredId: session.user.id,
        ownerId: referralCodes[0].id,
      },
    });

    return NextResponse.json({ data: { success: true } });
  } catch (error) {
    let errorMessage = 'An error occurred!';
    if (error instanceof Error) errorMessage = error.message;

    return NextResponse.json({ error: { message: errorMessage } }, { status: 500 });
  }
}
