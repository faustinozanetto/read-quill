import {
  ReferralsDeleteResponse,
  ReferralsGetResponse,
  ReferralsPostResponse,
} from '@modules/api/types/referrals-api.types';
import { REFERRALS_ACTIONS_VALIDATIONS_API } from '@modules/referrals/lib/referrals.validations';
import { prisma } from '@read-quill/database';
import { auth } from 'auth';
import { NextRequest, NextResponse } from 'next/server';

// /api/referrals GET : Gets a referral code by name
export async function GET(request: NextRequest): Promise<NextResponse<ReferralsGetResponse>> {
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

    const users = await prisma.user.findMany({
      where: {
        referralCode: {
          contains: code,
        },
      },
      select: { referralCode: true, name: true, avatar: { select: { path: true } } },
    });

    return NextResponse.json({ data: { referralCodes: users } });
  } catch (error) {
    let errorMessage = 'An error occurred!';
    if (error instanceof Error) errorMessage = error.message;

    return NextResponse.json({ error: { message: errorMessage } }, { status: 500 });
  }
}

// /api/referrals POST : Creates a referral code
export async function POST(request: NextRequest): Promise<NextResponse<ReferralsPostResponse>> {
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

// /api/referrals PATCH : Edits a referral code
export async function PATCH(request: NextRequest): Promise<NextResponse<ReferralsPostResponse>> {
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
    const { referralCode } = REFERRALS_ACTIONS_VALIDATIONS_API.EDIT.parse(json);

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

// /api/referrals DELETE : Deletes a referral code
export async function DELETE(): Promise<NextResponse<ReferralsDeleteResponse>> {
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

    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        referralCode: null,
      },
    });

    return NextResponse.json({ data: { success: true } });
  } catch (error) {
    let errorMessage = 'An error occurred!';
    if (error instanceof Error) errorMessage = error.message;

    return NextResponse.json({ error: { message: errorMessage } }, { status: 500 });
  }
}
