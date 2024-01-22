'use client';

import React, { useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import type { ApexOptions } from 'apexcharts';
import { useReadInsightsTrends } from '@modules/dashboard/hooks/use-read-insights-trends';
import type { DashboardReadInsightsReadTrendsIntervalType } from '@modules/dashboard/types/dashboard.types';
import { dashboardReadInsightsReadTrendsIntervals } from '@modules/dashboard/types/dashboard.types';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  Button,
  ChevronDownIcon,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
} from '@read-quill/design-system/src';
import { useTheme } from 'next-theme-kit';

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

const DashboardReadInsightTrends: React.FC = () => {
  const [interval, setInterval] = useState<DashboardReadInsightsReadTrendsIntervalType>('daily');

  const { theme } = useTheme();
  const { data } = useReadInsightsTrends({ interval });

  const getWeekNumber = (date: Date): number => {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
  };

  const categories = useMemo(() => {
    return Object.keys(data.trends).map((date) => {
      const parsedDate = new Date(date);

      switch (interval) {
        case 'daily':
          return parsedDate.toLocaleDateString('en-US', { dateStyle: 'medium' });
        case 'weekly':
          return `Week ${getWeekNumber(parsedDate)}, ${parsedDate.getFullYear()}`;
        case 'monthly':
          return parsedDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
        default:
          return '';
      }
    });
  }, [data, interval]);

  const options: ApexOptions = {
    theme: {
      mode: theme === 'dark' ? 'dark' : 'light',
      palette: 'palette1',
      monochrome: {
        enabled: true,
        color: '#f97316',
        shadeTo: theme === 'dark' ? 'dark' : 'light',
      },
    },
    chart: {
      id: 'read-trends-chart',
      type: 'bar',
      selection: { enabled: false },
      animations: { enabled: true },
      fontFamily: 'inherit',
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      lineCap: 'round',
      curve: 'smooth',
    },
    markers: {
      size: 0,
    },
    xaxis: {
      axisTicks: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      labels: {
        style: {
          fontSize: '12px',
          fontWeight: 500,
        },
      },
      categories,
      type: 'category',
    },
    yaxis: {
      labels: {
        style: {
          fontSize: '12px',
          fontWeight: 500,
        },
      },
    },
    grid: {
      show: true,
      strokeDashArray: 5,
      xaxis: {
        lines: {
          show: true,
        },
      },
      padding: {
        top: 5,
        right: 20,
      },
    },
    fill: {
      opacity: 0.8,
    },
  };

  const series = useMemo(() => {
    const mappedData = Object.values(data.trends).map((trend) => {
      return trend.reduce((acc, cur) => {
        return acc + cur.pagesRead;
      }, 0);
    });
    return [
      {
        name: 'Pages Read',
        data: mappedData,
      },
    ];
  }, [data]);

  return (
    <div className="rounded-lg border p-4 shadow flex flex-col gap-2">
      <div className="flex justify-between">
        <h3 className="text-xl font-bold">Read Trends</h3>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="ml-auto" variant="outline">
              Interval
              <ChevronDownIcon className="ml-2" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[150px]">
            <DropdownMenuLabel>Time Interval</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {dashboardReadInsightsReadTrendsIntervals.map((trendInterval) => {
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
      </div>
      <ReactApexChart height={250} options={options} series={series} type="bar" />
    </div>
  );
};

export default DashboardReadInsightTrends;
