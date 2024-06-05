'use client';

import React from 'react';
import UserSettingsTab from '../user-settings-tab';
import { Session } from 'next-auth';
import { Label, Skeleton } from '@read-quill/design-system';
import { useUserMemberSince } from '@modules/users/hooks/use-use-member-since';

interface UserSettingsDetailsProps {
  session: Session;
}

const UserSettingsDetails: React.FC<UserSettingsDetailsProps> = (props) => {
  const { session } = props;

  const { data: memberSince, isLoading: isMemberSinceLoading } = useUserMemberSince({
    userId: session.user.id,
  });

  return (
    <UserSettingsTab title="Details" type="details">
      <div className="flex flex-col gap-2 mt-2">
        <div>
          <Label className="block">Username</Label>
          <span className="text-sm">{session.user.name}</span>
        </div>
        <div>
          <Label className="block">Email</Label>
          <span className="text-sm">{session.user.email}</span>
        </div>
        <div>
          <Label className="block">Member Since</Label>
          {isMemberSinceLoading && <Skeleton className="h-4 w-24" />}
          {!isMemberSinceLoading && memberSince?.data?.memberSince && (
            <span className="text-sm">
              {new Date(memberSince?.data?.memberSince).toLocaleDateString('en-US', { dateStyle: 'full' })}
            </span>
          )}
        </div>
      </div>
    </UserSettingsTab>
  );
};
export default UserSettingsDetails;
