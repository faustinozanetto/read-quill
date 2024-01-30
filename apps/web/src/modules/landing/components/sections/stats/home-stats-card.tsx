import React from 'react';
import { useCountUp } from '@modules/common/hooks/use-count-up';

export interface HomeStatsCardProps {
  title: string;
  value: number;
  icon: React.JSX.Element;
}

const HomeStatsCard: React.FC<HomeStatsCardProps> = (props) => {
  const { title, value, icon } = props;

  const { count, ref } = useCountUp({ startValue: 0, endValue: value, duration: 2750 });

  return (
    <div
      className="border shadow rounded-lg p-4 flex flex-col items-center justify-center text-center bg-card"
      ref={ref}
    >
      {icon}
      <h3 className="text-lg font-semibold mt-2">{title}</h3>
      <span className="text-primary text-3xl font-extrabold md:text-4xl">{count}</span>
    </div>
  );
};

export default HomeStatsCard;
