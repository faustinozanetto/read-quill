'use client';

import React, { useMemo } from 'react';
import dynamic from 'next/dynamic';
import type { ApexOptions } from 'apexcharts';
import { useTheme } from 'next-theme-kit';
import type { DashboardBooksRatingsGetResponse } from '@modules/api/types/dashboard-api.types';

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface DashboardBooksRatingsChartProps {
  booksRatings: DashboardBooksRatingsGetResponse['booksRatings'];
}

const DashboardBooksRatingsChart: React.FC<DashboardBooksRatingsChartProps> = (props) => {
  const { booksRatings } = props;
  const { theme } = useTheme();

  const series = useMemo<ApexOptions['series']>(() => {
    return booksRatings.map((rating) => rating.count);
  }, [booksRatings]);

  const options: ApexOptions = useMemo(
    () => ({
      theme: {
        mode: theme === 'dark' ? 'dark' : 'light',
        palette: 'palette1',
        monochrome: {
          enabled: true,
          color: '#74981b',
          shadeTo: theme === 'dark' ? 'dark' : 'light',
        },
      },
      chart: {
        id: 'books-ratings-chart',
        type: 'pie',
        selection: { enabled: false },
        animations: { enabled: true },
        fontFamily: 'inherit',
        toolbar: {
          show: false,
        },
        background: 'transparent',
      },
      fill: {
        opacity: 0.8,
      },
      labels: booksRatings.map((rating) => `${rating.rating} Star`),
    }),
    [theme, booksRatings]
  );

  return <ReactApexChart height={250} options={options} series={series} type="pie" width="100%" />;
};

export default DashboardBooksRatingsChart;
