'use client';

import React from 'react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  Button,
  ChevronDownIcon,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
} from '@read-quill/design-system';
import { DataInterval, INTERVARL_TYPE } from '@modules/common/types/common.types';

interface DataIntervalSelectProps {
  interval: DataInterval;
  setInterval: (interval: DataInterval) => void;
}

const DataIntervalSelect: React.FC<DataIntervalSelectProps> = (props) => {
  const { setInterval, interval } = props;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="ml-auto h-8" size="sm" variant="outline">
          Interval
          <ChevronDownIcon className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[150px]">
        <DropdownMenuLabel>Time Interval</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {INTERVARL_TYPE.map((trendInterval) => {
          return (
            <DropdownMenuCheckboxItem
              checked={interval === trendInterval}
              className="capitalize"
              key={trendInterval}
              onCheckedChange={() => {
                setInterval(trendInterval);
              }}
            >
              {trendInterval}
            </DropdownMenuCheckboxItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DataIntervalSelect;
