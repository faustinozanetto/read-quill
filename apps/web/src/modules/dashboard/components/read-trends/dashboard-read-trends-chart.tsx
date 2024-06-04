'use client';

import React, { useMemo } from 'react';
import dynamic from 'next/dynamic';
import type { ApexOptions } from 'apexcharts';
import { useTheme } from 'next-theme-kit';
import type { DashboardReadTrendsIntervalType } from '@modules/dashboard/types/dashboard.types';
import type { DashboardReadTrendsGetResponse } from '@modules/api/types/dashboard-api.types';

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

const getWeekNumber = (date: Date): number => {
  const MILLISECONDS_IN_A_DAY = 86400000;

  const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
  const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / MILLISECONDS_IN_A_DAY;
  return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
};

interface DashboardReadTrendsChartProps {
  trends: DashboardReadTrendsGetResponse['trends'];
  interval: DashboardReadTrendsIntervalType;
}

const DashboardReadTrendsChart: React.FC<DashboardReadTrendsChartProps> = (props) => {
  const { trends, interval } = props;

  const { theme } = useTheme();

  const categories = useMemo(() => {
    return trends.map((trend) => {
      const parsedDate = new Date(trend.date);

      switch (interval) {
        case 'daily':
          return parsedDate.toLocaleDateString('en-US', { dateStyle: 'short' });
        case 'weekly':
          return `Week ${getWeekNumber(parsedDate)}, ${parsedDate.getFullYear()}`;
        case 'monthly':
          return parsedDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
        default:
          return '';
      }
    });
  }, [trends, interval]);

  const options: ApexOptions = useMemo(
    () => ({
      theme: {
        mode: theme === 'dark' ? 'dark' : 'light',
        monochrome: {
          enabled: true,
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
        background: 'transparent',
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
      },
      fill: {
        opacity: 0.8,
      },
    }),
    [categories, theme]
  );

  const series = useMemo(() => {
    const mappedData = trends.map((trend) => {
      return trend.registries.reduce((acc, cur) => {
        return acc + cur.pagesRead;
      }, 0);
    });
    return [
      {
        name: 'Pages Read',
        data: mappedData,
      },
    ];
  }, [trends]);

  return <ReactApexChart height={350} options={options} series={series} type="bar" width="100%" />;
};

export default DashboardReadTrendsChart;
