'use client';

import React from 'react';
import Image from 'next/image';
import { useCountUp } from '@modules/common/hooks/use-count-up';

interface DashboardBooksProgressCardProps {
  id: string;
  name: string;
  cover: string;
  progress: number;
}

const DashboardBooksProgressCard: React.FC<DashboardBooksProgressCardProps> = (props) => {
  const { name, cover, progress } = props;

  const { count, ref } = useCountUp({ startValue: 0, endValue: progress, startOnInView: true });

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
      <h3 className="font-semibold text-center p-2">{name}</h3>
    </div>
  );
};

export default DashboardBooksProgressCard;
