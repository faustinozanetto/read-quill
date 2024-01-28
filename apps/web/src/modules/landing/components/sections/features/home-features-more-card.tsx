import { StarIcon } from '@read-quill/design-system/src';
import React from 'react';

interface HomeFeaturesMoreCardProps {
  title: string;
}

const HomeFeaturesMoreCard: React.FC<HomeFeaturesMoreCardProps> = (props) => {
  const { title } = props;

  return (
    <div className="flex gap-2 shadow p-2.5 rounded-xl bg-secondary/50 items-center justify-center">
      <StarIcon className="stroke-primary fill-primary" />
      <span className="font-medium text-sm text-foreground/90">{title}</span>
    </div>
  );
};

export default HomeFeaturesMoreCard;
