'use client';

import React, { useMemo } from 'react';
import dynamic from 'next/dynamic';
import type { ApexOptions } from 'apexcharts';
import { useReadInsightsTrends } from '@modules/dashboard/hooks/use-read-insights-trends';
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
  Skeleton,
} from '@read-quill/design-system';
import { useTheme } from 'next-theme-kit';

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

const DashboardReadInsightTrends: React.FC = () => {
  const { theme } = useTheme();
  const { data, isFetching, interval, setInterval } = useReadInsightsTrends();

  const getWeekNumber = (date: Date): number => {
    const MILLISECONDS_IN_A_DAY = 86400000;

    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / MILLISECONDS_IN_A_DAY;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
  };

  const categories = useMemo(() => {
    return Object.keys(data.trends).map((date) => {
      const parsedDate = new Date(date);

      switch (interval) {
        case 'daily':
          return parsedDate.toLocaleDateString('en-US', { dateStyle: 'short' });
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
    plotOptions: {
      bar: {
        columnWidth: '40%',
        borderRadius: 2,
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
      <div className="flex flex-col">
        <div className="flex items-center justify-between mb-2">
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
        <p>
          Dive into your reading habits with Read Trends, showcasing detailed bar charts for daily, weekly, and monthly
          page consumption. Track your progress, set goals, and discover patterns to make the most of your reading
          journey.
        </p>
      </div>

      {isFetching ? <Skeleton className="h-48 w-full" /> : null}

      {!isFetching && series[0].data.length > 0 ? (
        <ReactApexChart height={250} options={options} series={series} type="bar" width="100%" />
      ) : null}

      {!isFetching && series[0].data.length === 0 ? <p>Not enough data to display read trends!</p> : null}
    </div>
  );
};

export default DashboardReadInsightTrends;
