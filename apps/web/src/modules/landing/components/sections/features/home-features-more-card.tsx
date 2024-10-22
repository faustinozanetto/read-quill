import { StarIcon } from '@read-quill/design-system/src';
import React from 'react';

interface HomeFeaturesMoreCardProps {
  title: string;
}

const HomeFeaturesMoreCard: React.FC<HomeFeaturesMoreCardProps> = (props) => {
  const { title } = props;

  return (
    <div className="flex gap-2 p-2.5 rounded-xl bg-primary items-center justify-center">
      <StarIcon className="stroke-primary-foreground fill-primary-foreground" />
      <span className="font-medium text-sm text-primary-foreground">{title}</span>
    </div>
  );
};

export default HomeFeaturesMoreCard;
