import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { auth } from 'auth';

import { getThreadViews, incrementThreadView } from '@modules/community/lib/community-thread-views.lib';
import { ThreadViewGetResponse, ThreadViewPostResponse } from '@modules/api/types/community-api.types';

// /api/community/thread/view GET : Gets thread views
export async function GET(request: NextRequest): Promise<NextResponse<ThreadViewGetResponse>> {
  try {
    const { searchParams } = new URL(request.url);
    const threadId = searchParams.get('threadId');

    if (!threadId) {
      return NextResponse.json({ error: { message: 'Thread ID is missing!' } }, { status: 400 });
    }

    const views = await getThreadViews(threadId);

    return NextResponse.json({ data: { views } });
  } catch (error) {
    let errorMessage = 'An error occurred!';
    if (error instanceof Error) errorMessage = error.message;

    return NextResponse.json({ error: { message: errorMessage } }, { status: 500 });
  }
}

// /api/community/thread/view POST : Registers a new thread view
export async function POST(request: NextRequest): Promise<NextResponse<ThreadViewPostResponse>> {
  try {
    const { searchParams } = new URL(request.url);
    const threadId = searchParams.get('threadId');

    if (!threadId) {
      return NextResponse.json({ error: { message: 'Thread ID is missing!' } }, { status: 400 });
    }

    const session = await auth();
    const userId = session?.user.id;
    // @ts-ignore
    const userIp = request.ip;

    await incrementThreadView(threadId, userId, userIp);

    return NextResponse.json({ data: { success: true } });
  } catch (error) {
    let errorMessage = 'An error occurred!';
    if (error instanceof Error) errorMessage = error.message;

    return NextResponse.json({ error: { message: errorMessage } }, { status: 500 });
  }
}
