import React from 'react';
import CommunityThreadCard from '../card/community-thread-card';
import { ThreadWithDetails } from '@modules/community/types/community.types';
import {
  UseFilterFilteringFunctions,
  UseFilterSortingFunctions,
  useFilterData,
} from '@modules/filters/hooks/use-filter-data';
import { compareAsc } from 'date-fns';
import FiltersShell from '@modules/filters/components/filters-shell';
import CommunityThreadsFeedFiltering from './community-threads-feed-filtering';

interface CommunityThreadsFeedProps {
  threads: ThreadWithDetails[];
}

const CommunityThreadsFeed: React.FC<CommunityThreadsFeedProps> = (props) => {
  const { threads } = props;

  const filterFunctions: UseFilterFilteringFunctions<ThreadWithDetails> = {
    title: (item, value) => item.title.toLowerCase().includes((value as string).toLowerCase()),
    'author.name': (item, value) =>
      item.author.name ? item.author.name.toLowerCase().includes((value as string).toLowerCase()) : false,
    commentsCount: (item, value) => item.commentsCount <= (value as number),
  };

  const sortFunctions: UseFilterSortingFunctions<ThreadWithDetails> = {
    title: (a, b) => a.title.localeCompare(b.title),
    createdAt: (a, b) => {
      const aDate = a.createdAt ? new Date(a.createdAt) : new Date();
      const bDate = b.createdAt ? new Date(b.createdAt) : new Date();

      return compareAsc(aDate, bDate);
    },
    commentsCount: (a, b) => (a.commentsCount > b.commentsCount ? 1 : -1),
  };

  const { filteredData, filters, sort } = useFilterData<ThreadWithDetails>({
    data: threads,
    filterFunctions,
    sortFunctions,
  });

  return (
    <FiltersShell
      filtersContainerClassNames="min-w-[250px]"
      onRenderFilters={() => {
        return <CommunityThreadsFeedFiltering filters={filters} sort={sort} />;
      }}
    >
      <div className="flex flex-col gap-2 p-4 max-h-screen overflow-y-auto">
        {filteredData.map((thread) => {
          return <CommunityThreadCard thread={thread} key={`thread-${thread.id}`} />;
        })}
      </div>
    </FiltersShell>
  );
};

export default CommunityThreadsFeed;
