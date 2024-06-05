import { __PROD__, __URL__ } from '@modules/common/lib/common.constants';
import { authMiddleware } from '@modules/middlewares/auth.middleware';
import { threadMiddleware } from '@modules/middlewares/thread.middleware';

import { NextRequest, NextResponse } from 'next/server';

export async function threadRequest(req: NextRequest, res: NextResponse, next: Function) {
  if (!__PROD__) return next();

  if (req.nextUrl.pathname.startsWith('/community/threads')) {
    return await threadMiddleware(req);
  }

  return next();
}

export async function authRequest(req: NextRequest, res: NextResponse, next: Function) {
  return await authMiddleware(req);
}

function combineMiddleware(...middlewares: Function[]) {
  return async (req: NextRequest) => {
    for (const middleware of middlewares) {
      const result = await middleware(req, NextResponse.next(), () => {});
      if (result instanceof Response || result instanceof NextResponse) {
        return result;
      }
    }
    return NextResponse.next();
  };
}

export default combineMiddleware(authRequest, threadRequest);

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api)(.*)'],
};
