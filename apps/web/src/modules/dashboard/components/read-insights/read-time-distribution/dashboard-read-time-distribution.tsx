'use client';

import React, { useMemo } from 'react';
import dynamic from 'next/dynamic';
import type { ApexOptions } from 'apexcharts';
import { Skeleton } from '@read-quill/design-system';
import { useTheme } from 'next-theme-kit';
import { useReadInsightsTimeDistribution } from '@modules/dashboard/hooks/use-read-insights-time-distribution';

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

const DashboardReadTimeDistribution: React.FC = () => {
  const { theme } = useTheme();
  const { data, isFetching } = useReadInsightsTimeDistribution();

  const formattedData = useMemo(() => {
    return Object.entries(data.timeDistribution).map((entry) => ({
      x: entry[0],
      y: entry[1],
    }));
  }, [data]);

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
        palette: 'palette1',
        monochrome: {
          enabled: true,
          color: '#f97316',
          shadeTo: theme === 'dark' ? 'dark' : 'light',
        },
      },
      chart: {
        id: 'read-time-distribution-chart',
        type: 'line',
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
      },
      yaxis: {
        show: true,
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
          right: 5,
        },
      },
    }),
    [theme]
  );

  return (
    <div className="rounded-lg border p-4 shadow flex flex-col gap-2">
      <h3 className="text-xl font-bold">Read Time Distribution</h3>
      <p>
        Explore your reading patterns with the Read Time Distribution graph, revealing the accumulated pages read
        throughout the day. Uncover peak reading hours and gain insights to enhance your daily reading routine.
      </p>

      {isFetching ? <Skeleton className="h-48 w-full" /> : null}

      {!isFetching && formattedData.length > 0 ? (
        <ReactApexChart height={250} options={options} series={series} type="line" width="100%" />
      ) : null}

      {!isFetching && formattedData.length === 0 ? <p>Not enough data to display read trends!</p> : null}
    </div>
  );
};

export default DashboardReadTimeDistribution;
