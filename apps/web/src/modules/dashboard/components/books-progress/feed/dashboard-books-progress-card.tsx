'use client';

import React from 'react';
import Image from 'next/image';
import { useCountUp } from '@modules/common/hooks/use-count-up';
import Link from 'next/link';
import { Image as DBImage } from '@read-quill/database';
import { getImagePublicUrl } from '@modules/images/lib/images.lib';

interface DashboardBooksProgressCardProps {
  id: string;
  name: string;
  cover: DBImage;
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
          src={getImagePublicUrl('BookCovers', cover.path)}
          width={200}
        />
        <div
          className="bg-primary/80 left-0 bottom-0 right-0 absolute items-center justify-center flex rounded-t-lg"
          style={{ top: `${100 - count}%` }}
        >
          {count > 10 ? <span className="text-2xl text-primary-foreground font-bold block">{count}%</span> : null}
        </div>
      </div>
      <Link href={`/books/${id}`} className="block font-medium text-center text-sm p-1 hover:underline">
        {name}
      </Link>
    </div>
  );
};

export default DashboardBooksProgressCard;
