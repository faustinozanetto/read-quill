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

import { ReadInsightsTrendsDailyRange } from '@modules/dashboard/hooks/use-read-insights-trends';

interface DashboardReadInsightTrendsDailyRangeSelectProps {
  dailyRange: ReadInsightsTrendsDailyRange;
  setDailyRange: (dailyRange: ReadInsightsTrendsDailyRange) => void;
}

const DashboardReadInsightTrendsDailyRangeSelect: React.FC<DashboardReadInsightTrendsDailyRangeSelectProps> = (
  props
) => {
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
        <Calendar mode="range" selected={dailyRange} onSelect={setDailyRange} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DashboardReadInsightTrendsDailyRangeSelect;
