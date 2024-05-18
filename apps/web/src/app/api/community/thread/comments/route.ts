import { prisma } from '@read-quill/database';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { ThreadCommentsGetResponse } from '@modules/api/types/community-api.types';
import { ThreadCommentNode } from '@modules/community/types/community.types';

async function buildCommentsTree(
  threadId: string,
  replyToId: string | null = null,
  pageIndex: number,
  pageSize: number
): Promise<ThreadCommentNode[]> {
  const skip = pageSize * pageIndex;
  const threadComments = await prisma.threadComment.findMany({
    where: { threadId, replyToId },
    skip,
    take: pageSize,
    include: { author: { select: { id: true, name: true, image: true } } },
    orderBy: { createdAt: 'asc' },
  });

  const commentNodes: ThreadCommentNode[] = await Promise.all(
    threadComments.map(async (comment) => {
      const replies = await buildCommentsTree(threadId, comment.id, pageIndex, pageSize);
      return { comment, replies };
    })
  );

  // Sort comments and their replies by creation date in ascending order
  const sortedCommentNodes = commentNodes.sort((a, b) => {
    return new Date(b.comment.createdAt).getTime() - new Date(a.comment.createdAt).getTime();
  });

  return sortedCommentNodes;
}

// /api/community/thread/comments GET : Gets the comments of a thread
export async function GET(request: NextRequest): Promise<NextResponse<ThreadCommentsGetResponse>> {
  try {
    const { searchParams } = new URL(request.url);
    const threadId = searchParams.get('threadId');

    if (!threadId) {
      return new NextResponse('Thread ID is missing', { status: 400 });
    }

    const pageIndex = Number.parseInt(searchParams.get('pageIndex') ?? '0');
    const pageSize = Number.parseInt(searchParams.get('pageSize') ?? '6');

    // Build the comments tree
    const commentsTree = await buildCommentsTree(threadId, null, pageIndex, pageSize);

    // Fetch the total count of threads
    const totalCount = await prisma.threadComment.count({ where: { threadId } });

    // Calculate the total number of pages for pagination
    const pageCount = Math.ceil(totalCount / pageSize);
    const hasMore = pageIndex < pageCount - 1;

    return NextResponse.json({ comments: commentsTree, pageCount, hasMore });
  } catch (error) {
    let errorMessage = 'An error occurred!';
    if (error instanceof Error) errorMessage = error.message;

    return new NextResponse(errorMessage, { status: 500 });
  }
}
