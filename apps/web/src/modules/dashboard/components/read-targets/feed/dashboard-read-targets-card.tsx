'use client';

import React from 'react';
import Fireworks from 'react-canvas-confetti/dist/presets/fireworks';
import type { TConductorInstance } from 'react-canvas-confetti/dist/types';
import type { DashboardReadTargetsType } from '@modules/dashboard/types/dashboard.types';
import { capitalize } from '@modules/common/lib/common.lib';
import { useCountUp } from '@modules/common/hooks/use-count-up';

interface DashboardReadTargetsCardProps {
  type: DashboardReadTargetsType;
  value: number;
  target: number;
}

const DashboardReadTargetsCard: React.FC<DashboardReadTargetsCardProps> = (props) => {
  const { type, value, target } = props;

  const radius = 50;
  const strokeWidth = 16;
  const strokeDasharray = 2 * Math.PI * radius;

  const targetPercentageValue = Math.min(100, Math.max(0, (value / target) * 100));

  const { count, ref } = useCountUp({
    startValue: 0,
    endValue: targetPercentageValue,
    startOnInView: true,
    duration: 2000,
  });

  const onInitConfetti = ({ conductor }: { conductor: TConductorInstance }): void => {
    conductor.shoot();
  };

  return (
    <div className="rounded-lg border p-4 shadow" ref={ref}>
      <div className="flex justify-between">
        <h3 className="font-bold uppercase text-lg underline decoration-primary decoration-4 mb-2">
          {capitalize(type)}
        </h3>
        <span className="font-bold text-end">
          {value}/{target} pages
        </span>
      </div>

      {value >= target ? <Fireworks onInit={onInitConfetti} /> : null}

      <svg className="m-auto mt-4" height="128" width="128" xmlns="http://www.w3.org/2000/svg">
        <circle
          className="stroke-primary fill-transparent -rotate-90 origin-center"
          cx="50%"
          cy="50%"
          r={radius}
          strokeWidth={strokeWidth}
          style={{
            strokeDasharray,
            strokeDashoffset: strokeDasharray - (strokeDasharray * count) / 100,
          }}
        />
        <text
          alignmentBaseline="middle"
          className="font-extrabold text-2xl fill-foreground"
          textAnchor="middle"
          x="50%"
          y="50%"
        >
          {count.toFixed(0)}%
        </text>
      </svg>
    </div>
  );
};

export default DashboardReadTargetsCard;
