import { prisma } from '@read-quill/database';
import { NextResponse } from 'next/server';
import type { DashboardReadTargetsCreatedGetResponse } from '@modules/api/types/dashboard-api.types';
import { auth } from 'auth';

// /api/dashboard/read-targets GET : Gets wether a user created reader targets or not
export async function GET(): Promise<NextResponse<DashboardReadTargetsCreatedGetResponse>> {
  try {
    const session = await auth();

    if (!session) {
      return new NextResponse('Unauthorized', { status: 403 });
    }
    const count = await prisma.readTargets.count({ where: { user: { id: session.user.id } } });

    return NextResponse.json({ created: count > 0 });
  } catch (error) {
    let errorMessage = 'An error occurred!';
    if (error instanceof Error) errorMessage = error.message;

    return new NextResponse(errorMessage, { status: 500 });
  }
}
