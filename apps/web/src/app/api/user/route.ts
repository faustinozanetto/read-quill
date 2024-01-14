import { authOptions } from '@modules/auth/lib/auth.lib';
import { prisma } from '@read-quill/database';
import { getServerSession } from 'next-auth/next';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse('Unauthorized', { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return new NextResponse('User ID is missing', { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { id: userId } });
    return NextResponse.json({ user });
  } catch (error) {
    return new NextResponse(error.message, { status: 500 });
  }
}
