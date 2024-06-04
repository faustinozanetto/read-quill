'use client';

import React from 'react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  Button,
  ChevronDownIcon,
  DropdownMenuContent,
  Calendar,
} from '@read-quill/design-system';
import { ReadTrendsDailyRange } from '@modules/dashboard/hooks/use-read-trends';

interface DashboardReadTrendsDailyRangeSelectProps {
  dailyRange: ReadTrendsDailyRange;
  setDailyRange: (dailyRange: ReadTrendsDailyRange) => void;
}

const DashboardReadTrendsDailyRangeSelect: React.FC<DashboardReadTrendsDailyRangeSelectProps> = (props) => {
  const { dailyRange, setDailyRange } = props;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="ml-auto h-8" size="sm" variant="outline">
          Select Daily Range
          <ChevronDownIcon className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <Calendar
          mode="range"
          selected={dailyRange}
          onSelect={(range) => {
            if (!range) return;

            setDailyRange({ from: range.from ?? new Date(), to: range.to ?? new Date() });
          }}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DashboardReadTrendsDailyRangeSelect;
