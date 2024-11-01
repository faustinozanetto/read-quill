'use client';

import React, { useState } from 'react';
import { useAuthContext } from '@modules/auth/hooks/use-auth-context';
import { useReferralCodeReferred } from '@modules/referrals/hooks/use-referral-code-referred';
import ReferredUserCardPlaceholder from './referred-user-card-placeholder';
import { useUserReferralCode } from '@modules/referrals/hooks/use-user-referral-code';
import ReferredUsersFeed from './referred-users-feed';
import { ExclamationIcon } from '@read-quill/design-system';

const UserReferralsReferred: React.FC = () => {
  const [pageSize, setPageSize] = useState(2);

  const { user } = useAuthContext();

  const { data: referralCodeData } = useUserReferralCode({ userId: user?.id });

  const { data, isLoading, getCanNextPage, getCanPreviousPage, nextPage, page, previousPage, setPageIndex } =
    useReferralCodeReferred({ code: referralCodeData?.data?.referralCode, pageSize });

  return (
    <div className="flex flex-col rounded-lg border p-4 gap-2">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Referred Users</h1>
      </div>
      <p className="mb-2">View and manage the users you referred using your unique code here.</p>

      {isLoading && (
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <ReferredUserCardPlaceholder key={`referred-user-placeholder-${i}`} />
          ))}
        </div>
      )}

      {!isLoading && data?.data?.referredUsers && data.data.referredUsers.length > 0 && (
        <ReferredUsersFeed
          referredUsers={data.data.referredUsers}
          getCanNextPage={getCanNextPage}
          getCanPreviousPage={getCanPreviousPage}
          nextPage={nextPage}
          page={page}
          pageCount={data.data.pageCount}
          previousPage={previousPage}
          setPageIndex={setPageIndex}
          pageSize={pageSize}
          setPageSize={setPageSize}
        />
      )}

      {!isLoading && data?.data?.referredUsers && data.data.referredUsers.length === 0 && (
        <div className="flex items-center justify-center gap-2">
          <div className="bg-primary p-2 rounded-lg border">
            <ExclamationIcon className="stroke-primary-foreground" />
          </div>
          <p>No users have used your referral code yet. Start sharing it!</p>
        </div>
      )}
    </div>
  );
};

export default UserReferralsReferred;
