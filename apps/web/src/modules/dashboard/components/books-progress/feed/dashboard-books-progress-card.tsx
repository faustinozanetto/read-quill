'use client';

import React from 'react';
import { useCountUp } from '@modules/common/hooks/use-count-up';
import Link from 'next/link';
import UserBookCover from '@modules/books/components/user/details/cover/user-book-cover';
import { Button } from '@read-quill/design-system';
import { BookProgressEntry } from '@modules/dashboard/types/dashboard.types';

interface DashboardBooksProgressCardProps {
  bookProgress: BookProgressEntry;
}

const DashboardBooksProgressCard: React.FC<DashboardBooksProgressCardProps> = (props) => {
  const { bookProgress } = props;
  const { id, progress, author, cover, name } = bookProgress;

  const clampedProgress = Math.max(0, Math.min(progress, 100));

  const { count, ref } = useCountUp({ startValue: 0, endValue: clampedProgress, startOnInView: true });

  return (
    <div ref={ref} className="rounded-lg border p-4 flex flex-col h-fit shrink-0">
      <div className="relative">
        <UserBookCover
          className="w-full"
          imageClassNames="h-32 md:h-36 lg:h-40 w-full"
          image={cover}
          // placeholderImage={placeholderCover}
        />
        <div
          className="bg-primary/80 left-0 bottom-2 right-0 absolute items-center justify-center flex rounded-lg"
          style={{ top: `${100 - count}%` }}
        >
          {count > 10 ? <span className="text-2xl text-primary-foreground font-bold block">{count}%</span> : null}
        </div>
      </div>
      <h2 className="font-semibold">{name}</h2>
      <h3 className="text-sm">{author}</h3>
      <Button variant="link" className="ml-auto w-fit" asChild>
        <Link href={`/books/${id}`} title="Goto Book Page">
          Goto Book Page
        </Link>
      </Button>
    </div>
  );
};

export default DashboardBooksProgressCard;
