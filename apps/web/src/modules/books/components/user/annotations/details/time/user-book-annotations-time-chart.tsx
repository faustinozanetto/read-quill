'use client';

import React, { useMemo } from 'react';

import { ApexOptions } from 'apexcharts';
import { useTheme } from 'next-theme-kit';
import { Annotation } from '@read-quill/database';
import dynamic from 'next/dynamic';
import { DataInterval } from '@modules/common/types/common.types';

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

const getWeekNumber = (date: Date): number => {
  const MILLISECONDS_IN_A_DAY = 86400000;

  const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
  const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / MILLISECONDS_IN_A_DAY;
  return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
};

interface UserBookAnnotationsTimeChartProps {
  annotationGroups: [string, Annotation[]][];
  interval: DataInterval;
}

const UserBookAnnotationsTimeChart: React.FC<UserBookAnnotationsTimeChartProps> = (props) => {
  const { annotationGroups, interval } = props;

  const { theme } = useTheme();

  const formattedData = useMemo(() => {
    const items = annotationGroups.reduce<{ x: string; y: number }[]>((acc, curr) => {
      acc.push({
        x: curr[0],
        y: curr[1].length,
      });

      return acc;
    }, []);

    return items;
  }, [annotationGroups]);

  const series = useMemo<ApexOptions['series']>(
    () => [
      {
        name: 'Annotations',
        data: formattedData,
      },
    ],
    [formattedData]
  );

  const categories = useMemo(() => {
    return annotationGroups.map((annotationGroup) => {
      const parsedDate = new Date(annotationGroup[0]);

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
  }, [annotationGroups, interval]);

  const options: ApexOptions = useMemo(
    () => ({
      theme: {
        mode: theme === 'dark' ? 'dark' : 'light',
        monochrome: {
          enabled: true,
          color: '#f9ce94',
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

  return (
    <div>
      <ReactApexChart height={350} options={options} series={series} type="bar" width="100%" />
    </div>
  );
};

export default UserBookAnnotationsTimeChart;
