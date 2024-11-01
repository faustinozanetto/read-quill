import React from 'react';
import * as Icons from '@read-quill/design-system/src/components/icons';
import ThemeToggler from '@modules/theme/components/theme-toggler';

const DevIconsPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-20">
      <h1 className="text-5xl font-extrabold mb-10">
        Icons Gallery <ThemeToggler />
      </h1>
      <div className="flex justify-center items-center flex-wrap gap-4">
        {Object.entries(Icons).map((component, index) => {
          const IconName = component[0];
          const IconComponent = component[1];
          return (
            <div className="bg-white rounded-2xl p-2 flex flex-col items-center justify-center h-40 w-44 gap-2">
              <IconComponent key={index} className="h-10 w-10" />
              <p className="text-sm">{IconName}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DevIconsPage;
