import { UserSettingsTabType } from '@modules/users/types/user-settings.types';
import { Separator, TabsContent } from '@read-quill/design-system';
import React from 'react';

interface UserSettingsTabProps {
  title: string;
  type: UserSettingsTabType;
  children: React.ReactNode;
}

const UserSettingsTab: React.FC<UserSettingsTabProps> = (props) => {
  const { title, type, children } = props;
  return (
    <TabsContent className="mt-0" value={type}>
      <h2 className="text-lg font-medium">{title}</h2>
      <Separator />
      {children}
    </TabsContent>
  );
};
export default UserSettingsTab;
