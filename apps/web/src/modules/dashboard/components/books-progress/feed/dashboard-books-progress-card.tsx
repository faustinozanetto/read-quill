'use client';

import React from 'react';
import Image from 'next/image';
import { useCountUp } from '@modules/common/hooks/use-count-up';
import Link from 'next/link';

interface DashboardBooksProgressCardProps {
  id: string;
  name: string;
  cover: string;
  progress: number;
}

const DashboardBooksProgressCard: React.FC<DashboardBooksProgressCardProps> = (props) => {
  const { id, name, cover, progress } = props;

  const clampedProgress = Math.max(0, Math.min(progress, 100));

  const { count, ref } = useCountUp({ startValue: 0, endValue: clampedProgress, startOnInView: true });

  return (
    <div className="rounded-lg border shadow" ref={ref}>
      <div className="relative">
        <Image
          alt={`${name} progress image`}
          className="h-40 w-full rounded-t-lg object-cover object-center"
          height={200}
          src={cover}
          width={200}
        />
        <div
          className="bg-primary/80 left-0 bottom-0 right-0 absolute items-center justify-center flex"
          style={{ top: `${100 - count}%` }}
        >
          {count > 10 ? <span className="text-2xl font-bold block">{count}%</span> : null}
        </div>
      </div>
      <Link href={`/books/${id}`} className="block font-medium text-center p-1">
        {name}
      </Link>
    </div>
  );
};

export default DashboardBooksProgressCard;
