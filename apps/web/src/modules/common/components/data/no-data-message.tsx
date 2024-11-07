import React from 'react';
import { ExclamationIcon, cn } from '@read-quill/design-system';

interface NoDataMessageProps {
  children: React.JSX.Element;
  className?: string;
}

const NoDataMessage: React.FC<NoDataMessageProps> = (props) => {
  const { children, className } = props;

  return (
    <div className={cn('flex items-center justify-center gap-2', className)}>
      <div className="bg-primary p-2 rounded-lg border">
        <ExclamationIcon className="stroke-primary-foreground" />
      </div>
      {children}
    </div>
  );
};

export default NoDataMessage;
