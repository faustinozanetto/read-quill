import React from 'react';
import { CommunityThreadCard } from '../card/community-thread-card';
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
  children: React.ReactNode;
}

const CommunityThreadsFeed: React.FC<CommunityThreadsFeedProps> = (props) => {
  const { threads, children } = props;

  const filterFunctions: UseFilterFilteringFunctions<ThreadWithDetails> = {
    title: (item, value) => item.title.toLowerCase().includes((value as string).toLowerCase()),
    'author.name': (item, value) =>
      item.author.name ? item.author.name.toLowerCase().includes((value as string).toLowerCase()) : false,
    commentsCount: (item, value) => item.commentsCount <= (value as number),
    votes: (item, value) => item.votes <= (value as number),
    keywords: (item, value) => item.keywords.toLowerCase().includes((value as string).toLowerCase()),
  };

  const sortFunctions: UseFilterSortingFunctions<ThreadWithDetails> = {
    title: (a, b) => a.title.localeCompare(b.title),
    createdAt: (a, b) => {
      const aDate = a.createdAt ? new Date(a.createdAt) : new Date();
      const bDate = b.createdAt ? new Date(b.createdAt) : new Date();

      return compareAsc(aDate, bDate);
    },
    commentsCount: (a, b) => (a.commentsCount > b.commentsCount ? 1 : -1),
    votes: (a, b) => (a.votes > b.votes ? 1 : -1),
  };

  const { filteredData, filters, sort, noResults } = useFilterData<ThreadWithDetails>({
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
      <div className="p-4 grow flex flex-col justify-between gap-4">
        <span className="font-medium">Showing {filteredData.length} Threads</span>
        {noResults ? (
          <p className="my-auto text-center">
            It looks like there are <strong>no threads</strong> that match your current filters, try adjusting your
            filters!
          </p>
        ) : (
          <div className="flex flex-col gap-2 max-h-screen overflow-y-auto grow overflow-x-hidden">
            {filteredData.map((thread) => {
              return (
                <CommunityThreadCard.Root key={`thread-${thread.id}`} thread={thread}>
                  <CommunityThreadCard.Metadata>
                    <CommunityThreadCard.Votes />
                  </CommunityThreadCard.Metadata>
                  <CommunityThreadCard.Keywords />
                  <CommunityThreadCard.Content />
                  <div className="flex gap-2 items-center">
                    <CommunityThreadCard.Comments />
                    <CommunityThreadCard.Views />
                  </div>
                </CommunityThreadCard.Root>
              );
            })}
            {children}
          </div>
        )}
      </div>
    </FiltersShell>
  );
};

export default CommunityThreadsFeed;
