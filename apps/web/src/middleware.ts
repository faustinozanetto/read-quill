import { __PROD__, __URL__ } from '@modules/common/lib/common.constants';
import { threadMiddleware } from '@modules/middlewares/thread.middleware';

import { NextRequest, NextResponse } from 'next/server';

export async function threadRequest(req: NextRequest, res: NextResponse, next: Function) {
  if (!__PROD__) return next();

  if (req.nextUrl.pathname.startsWith('/community/threads')) {
    return await threadMiddleware(req);
  }

  return next();
}

// export async function authRequest(req: NextRequest, res: NextResponse, next: Function) {
//   const cookies = req.cookies;
//   const authCookie = cookies.get('authjs.session-token');
//   if (!authCookie) {
//     return NextResponse.redirect(new URL('/sign-in', req.nextUrl));
//   }

//   return next();
// }

export async function logRequest(req: NextRequest, res: NextResponse, next: Function) {
  next();
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

export default combineMiddleware(logRequest, threadRequest);

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api)(.*)'],
};
