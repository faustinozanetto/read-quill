import type { NextRequest, NextResponse } from 'next/server';
import AppMiddleware from '@modules/middleware/app.middleware';

export const config = {
  matcher: ['/books', '/dashboard', '/achievements'],
};

export default function middleware(req: NextRequest): Promise<NextResponse> {
  return AppMiddleware(req);
}
