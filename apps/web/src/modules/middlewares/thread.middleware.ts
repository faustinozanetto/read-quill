import { __URL__ } from '@modules/common/lib/common.constants';
import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function threadMiddleware(request: NextRequest): Promise<NextResponse> {
  try {
    const nextUrl = request.nextUrl.pathname;
    const threadId = nextUrl.substring(nextUrl.lastIndexOf('/')).slice(1);

    const url = new URL('/api/community/thread/view', __URL__);
    url.searchParams.set('threadId', threadId);
    await fetch(url, {
      headers: headers(),
      method: 'POST',
    });
  } catch (err) {
  } finally {
    return NextResponse.next();
  }
}
