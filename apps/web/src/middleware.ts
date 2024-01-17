import AppMiddleware from '@modules/middleware/app.middleware';
import { NextRequest, NextFetchEvent } from 'next/server';

export const config = {
  matcher: ['/books', '/dashboard'],
};

export default async function middleware(req: NextRequest, ev: NextFetchEvent) {
  return AppMiddleware(req);
}
