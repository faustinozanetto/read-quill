'use client';

import React from 'react';

import ReferredUserCard from './referred-user-card';
import { ReferredUser } from '@modules/referrals/types/referrals.types';
import PaginationControls, { PaginationControlsProps } from '@modules/common/components/pagination/pagination-controls';

interface ReferredUsersFeedProps extends Omit<PaginationControlsProps, 'perPageTitle'> {
  referredUsers: ReferredUser[];
}

const ReferredUsersFeed: React.FC<ReferredUsersFeedProps> = (props) => {
  const {
    referredUsers,
    getCanNextPage,
    getCanPreviousPage,
    nextPage,
    page,
    previousPage,
    setPageIndex,
    pageCount,
    pageSize,
    setPageSize,
  } = props;

  return (
    <div className="flex flex-col gap-2">
      <div className="space-y-2 xl:space-y-4">
        {referredUsers.map((referred) => (
          <ReferredUserCard key={`referred-user-${referred.referred.id}`} referredUser={referred} />
        ))}
      </div>
      <PaginationControls
        perPageTitle="Users per page"
        getCanNextPage={getCanNextPage}
        getCanPreviousPage={getCanPreviousPage}
        nextPage={nextPage}
        page={page}
        pageCount={pageCount}
        previousPage={previousPage}
        setPageIndex={setPageIndex}
        pageSize={pageSize}
        setPageSize={setPageSize}
      />
    </div>
  );
};

export default ReferredUsersFeed;
