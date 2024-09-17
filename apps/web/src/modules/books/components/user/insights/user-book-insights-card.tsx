import React from 'react';
import { Separator } from '@read-quill/design-system';

interface UserBookInsightsCardProps {
  title: string;
  content: React.ReactNode;
}

const UserBookInsightsCard: React.FC<UserBookInsightsCardProps> = (props) => {
  const { title, content } = props;

  return (
    <div className="space-y-2 rounded-lg p-4 border">
      <div className="rounded-lg border bg-foreground text-accent p-2 text-xl text-center uppercase font-extrabold w-full h-fit">
        {content}
      </div>
      <Separator />
      <span className="font-bold">{title}</span>
    </div>
  );
};

export default UserBookInsightsCard;
