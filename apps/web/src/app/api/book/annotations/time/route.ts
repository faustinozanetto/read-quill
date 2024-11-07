import { BookAnnotationsTimeGetResponse } from '@modules/api/types/annotations-api.types';
import { DataInterval } from '@modules/common/types/common.types';
import { Annotation, prisma } from '@read-quill/database';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

// /api/book/annotations/time GET : Gets the book annotations by a given bookId grouped by time
export async function GET(request: NextRequest): Promise<NextResponse<BookAnnotationsTimeGetResponse>> {
  try {
    const { searchParams } = new URL(request.url);
    const bookId = searchParams.get('bookId');

    if (!bookId) {
      return NextResponse.json(
        {
          error: {
            message: 'Book ID is required!',
          },
        },
        { status: 400 }
      );
    }

    const interval = (searchParams.get('interval') as DataInterval | null) ?? 'daily';

    const annotations = await prisma.annotation.findMany({
      where: { bookId },
    });

    const groupedAnnotations = annotations.reduce<Record<string, Annotation[]>>((acc, curr) => {
      const date = new Date(curr.createdAt);

      let key: string = '';
      if (interval === 'daily') key = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
      else if (interval === 'weekly') {
        const weekStartDate = new Date(date);
        weekStartDate.setDate(date.getDate() - date.getDay()); // Move to the start of the week
        key = `${weekStartDate.getFullYear()}-${weekStartDate.getMonth() + 1}-${weekStartDate.getDate()}`;
      } else if (interval === 'monthly') {
        key = `${date.getFullYear()}-${date.getMonth() + 1}`;
      }

      if (acc[key]) {
        acc[key].push(curr);
      } else {
        acc[key] = [curr];
      }

      return acc;
    }, {});

    return NextResponse.json({ data: { annotations: groupedAnnotations } });
  } catch (error) {
    let errorMessage = 'An error occurred!';
    if (error instanceof Error) errorMessage = error.message;

    return NextResponse.json({ error: { message: errorMessage } }, { status: 500 });
  }
}
