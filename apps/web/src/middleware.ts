import { __URL__ } from '@modules/common/lib/common.constants';
import { threadMiddleware } from '@modules/middlewares/thread.middleware';

import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/community/threads')) {
    return await threadMiddleware(request);
  }

  return NextResponse.next();
}
