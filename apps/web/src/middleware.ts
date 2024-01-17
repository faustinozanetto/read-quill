import AppMiddleware from '@modules/middleware/app.middleware';
import { NextRequest } from 'next/server';

export const config = {
  matcher: ['/books', '/dashboard'],
};

export default async function middleware(req: NextRequest) {
  return AppMiddleware(req);
}
