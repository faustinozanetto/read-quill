'use client';

import React, { useEffect, useState } from 'react';
import type { DashboardReadTargetsType } from '@modules/dashboard/types/dashboard.types';
import { capitalize } from '@modules/common/lib/common.lib';
import { useIsVisible } from '@modules/common/hooks/use-is-visible';
import Fireworks from 'react-canvas-confetti/dist/presets/fireworks';
import type { TConductorInstance } from 'react-canvas-confetti/dist/types';

interface DashboardReadTargetsCardProps {
  type: DashboardReadTargetsType;
  value: number;
  target: number;
}

const DashboardReadTargetsCard: React.FC<DashboardReadTargetsCardProps> = (props) => {
  const { type, value, target } = props;

  const { targetRef, isVisible } = useIsVisible();
  const [animateValue, setAnimateValue] = useState(0);

  const targetPercentageValue = Math.min(100, Math.max(0, (value / target) * 100));

  const radius = 50;
  const strokeWidth = 16;
  const strokeDasharray = 2 * Math.PI * radius;
  const strokeDashoffset = strokeDasharray - (strokeDasharray * animateValue) / 100;

  const onInitConfetti = ({ conductor }: { conductor: TConductorInstance }): void => {
    conductor.shoot();
  };

  useEffect(() => {
    if (isVisible) {
      setAnimateValue(targetPercentageValue);
    }
  }, [isVisible, targetPercentageValue]);

  return (
    <div className="rounded-lg border p-4 shadow" ref={targetRef}>
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
            strokeDashoffset,
            transition: 'stroke-dashoffset 1s ease-in-out',
          }}
        />
        <text
          alignmentBaseline="middle"
          className="font-extrabold text-2xl fill-foreground"
          textAnchor="middle"
          x="50%"
          y="50%"
        >
          {animateValue.toFixed(0)}%
        </text>
      </svg>
    </div>
  );
};

export default DashboardReadTargetsCard;
