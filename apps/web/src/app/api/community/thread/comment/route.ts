import { prisma } from '@read-quill/database';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { ThreadCommentPostResponse } from '@modules/api/types/community-api.types';
import { getServerSession } from 'next-auth';
import { authOptions } from '@modules/auth/lib/auth.lib';
import { createThreadCommentValidationApiSchema } from '@modules/community/validations/community.validations';

// /api/community/thread/comment POST : Creates a thread comment
export async function POST(request: NextRequest): Promise<NextResponse<ThreadCommentPostResponse>> {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse('Unauthorized', { status: 403 });
    }

    const json = await request.json();
    const { threadId, content } = createThreadCommentValidationApiSchema.parse(json);

    const threadComment = await prisma.threadComment.create({
      data: {
        threadId,
        content,
        authorId: session.user.id,
      },
    });

    console.log({ threadComment });

    return NextResponse.json({ success: true });
  } catch (error) {
    let errorMessage = 'An error occurred!';
    if (error instanceof Error) errorMessage = error.message;

    return new NextResponse(errorMessage, { status: 500 });
  }
}
