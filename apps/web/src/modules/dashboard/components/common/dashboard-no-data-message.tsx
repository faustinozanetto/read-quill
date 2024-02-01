import React from 'react';
import { ExclamationIcon } from '@read-quill/design-system';

interface DashboardNoDataMessageProps {
  children: React.JSX.Element;
}

const DashboardNoDataMessage: React.FC<DashboardNoDataMessageProps> = (props) => {
  const { children } = props;

  return (
    <div className="flex items-center justify-center gap-2">
      <div className="bg-primary p-2 rounded-lg border">
        <ExclamationIcon />
      </div>
      {children}
    </div>
  );
};

export default DashboardNoDataMessage;
