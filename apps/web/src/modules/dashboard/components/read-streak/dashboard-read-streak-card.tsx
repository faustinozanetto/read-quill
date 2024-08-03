import React from 'react';

import { DashboardReadStreakActivityEntry } from '@modules/dashboard/types/dashboard.types';
import Link from 'next/link';
import { isSameDay } from 'date-fns';

interface DashboardReadStreakCardProps {
  readStreak: DashboardReadStreakActivityEntry;
}

const DashboardReadStreakCard: React.FC<DashboardReadStreakCardProps> = (props) => {
  const { readStreak } = props;

  const isToday = isSameDay(readStreak.dateRead, new Date());

  return (
    <div
      className={`rounded-lg border p-4 shadow flex flex-col h-fit shrink-0 w-52 ${isToday ? 'border-primary' : ''}`}
    >
      <div className="rounded-lg border bg-foreground text-accent p-2 w-fit text-xl text-center uppercase font-extrabold aspect-square mx-auto mb-2">
        <p>{new Date(readStreak.dateRead).toLocaleDateString('en-US', { day: '2-digit' })}</p>
        <p className="block"> {new Date(readStreak.dateRead).toLocaleDateString('en-US', { month: 'short' })}</p>
      </div>
      <Link
        href={`/books/${readStreak.book.id}`}
        title="View Book Page"
        className="font-semibold line-clamp-1 hover:underline"
      >
        {readStreak.book.name}
      </Link>
      <p className="text-sm">
        Pages Read <span className="font-medium">{readStreak.pagesRead}</span>
      </p>
    </div>
  );
};

export default DashboardReadStreakCard;
