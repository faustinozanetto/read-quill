import { prisma } from '@read-quill/database';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { CommunityTopUsersGetResponse } from '@modules/api/types/community-api.types';
import { CommunityTopUser } from '@modules/community/types/community.types';

// /api/community/top-users GET : Gets the community top users.
export async function GET(request: NextRequest): Promise<NextResponse<CommunityTopUsersGetResponse>> {
  try {
    const { searchParams } = new URL(request.url);
    const take = Number.parseInt(searchParams.get('take') ?? '10');

    const users = await prisma.user.findMany({
      take,
      orderBy: {
        threads: {
          _count: 'desc', // Sort by the count of threads (descending)
        },
      },
      include: {
        avatar: true,
        threads: {
          select: {
            _count: true, // Select the count of threads
            votes: true, // Select the votes for each thread
          },
        },
      },
    });

    const mappedUsers: CommunityTopUser[] = users.map((user) => {
      const { threads, emailVerified, email, ...rest } = user;

      // Calculate the total votes for the user
      const totalVotes = threads.reduce((acc, curr) => acc + curr.votes, 0);

      return {
        user: {
          ...rest,
        },
        threadsCount: threads.length,
        totalVotes: totalVotes,
      };
    });

    // Sort users by their total votes
    mappedUsers.sort((a, b) => b.totalVotes - a.totalVotes);

    return NextResponse.json({ data: { topUsers: mappedUsers } });
  } catch (error) {
    let errorMessage = 'An error occurred!';
    if (error instanceof Error) errorMessage = error.message;

    return NextResponse.json({ error: { message: errorMessage } }, { status: 500 });
  }
}
