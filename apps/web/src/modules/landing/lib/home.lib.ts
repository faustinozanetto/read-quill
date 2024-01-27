import type { LandingStatType } from '@modules/api/types/landing-api.types';
import type { HomeStatsCardProps } from '../components/sections/stats/home-stats-card';

export const HOME_STATS: Record<LandingStatType, Omit<HomeStatsCardProps, 'value'>> = {
  activeUsers: { title: 'Active Users' },
  booksRegistered: { title: 'Books Registered' },
  pagesRead: { title: 'Pages Read' },
  annotationsCreated: { title: 'Annotations Created' },
};
