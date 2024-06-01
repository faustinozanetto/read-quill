import React from 'react';
import { ExclamationIcon, cn } from '@read-quill/design-system';

interface DashboardNoDataMessageProps {
  children: React.JSX.Element;
  className?: string;
}

const DashboardNoDataMessage: React.FC<DashboardNoDataMessageProps> = (props) => {
  const { children, className } = props;

  return (
    <div className={cn('flex items-center justify-center gap-2', className)}>
      <div className="bg-primary p-2 rounded-lg border">
        <ExclamationIcon />
      </div>
      {children}
    </div>
  );
};

export default DashboardNoDataMessage;
