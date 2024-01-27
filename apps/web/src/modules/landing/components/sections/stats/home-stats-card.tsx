import React from 'react';
import { useCountUp } from '@modules/common/hooks/use-count-up';

export interface HomeStatsCardProps {
  title: string;
  value: number;
}

const HomeStatsCard: React.FC<HomeStatsCardProps> = (props) => {
  const { title, value } = props;

  const { count, ref } = useCountUp({ startValue: 0, endValue: value, duration: 2750 });

  return (
    <div className="bg-background rounded border p-4 shadow transition-transform hover:scale-105" ref={ref}>
      <h3 className="text-lg font-semibold">{title} </h3>
      <span className="text-primary mt-2 text-3xl font-bold md:text-4xl xl:text-5xl">{count}</span>
    </div>
  );
};

export default HomeStatsCard;
