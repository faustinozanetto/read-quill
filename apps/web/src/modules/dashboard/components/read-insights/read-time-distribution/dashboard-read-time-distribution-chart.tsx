'use client';

import React, { useMemo } from 'react';
import dynamic from 'next/dynamic';
import type { ApexOptions } from 'apexcharts';
import { useTheme } from 'next-theme-kit';
import type { DashboardReadInsightsTimeDistributionGetResponse } from '@modules/api/types/dashboard-api.types';

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface DashboardReadTimeDistributionChartProps {
  timeDistribution: DashboardReadInsightsTimeDistributionGetResponse['timeDistribution'];
}

const DashboardReadTimeDistributionChart: React.FC<DashboardReadTimeDistributionChartProps> = (props) => {
  const { timeDistribution } = props;
  const { theme } = useTheme();

  const formattedData = useMemo(() => {
    return timeDistribution.map((entry) => ({
      x: entry.date,
      y: entry.pagesRead,
    }));
  }, [timeDistribution]);

  const series = useMemo<ApexOptions['series']>(
    () => [
      {
        name: 'Pages Read',
        type: 'area',
        data: formattedData,
      },
    ],
    [formattedData]
  );

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
        id: 'read-time-distribution-chart',
        type: 'line',
        selection: { enabled: false },
        animations: { enabled: true },
        fontFamily: 'inherit',
        background: 'transparent',
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
      },
      yaxis: {
        show: true,
      },
      fill: {
        opacity: 0.65,
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
    }),
    [theme]
  );

  return (
    <div>
      <ReactApexChart height={350} options={options} series={series} type="line" width="100%" />
      <p className="text-sm">Data is shown in intervals of 60 minutes in the timespan of a day.</p>
    </div>
  );
};

export default DashboardReadTimeDistributionChart;
