import type { LandingStats, LandingStatsGetResponse } from '@modules/api/types/landing-api.types';
import { __URL__ } from '@modules/common/lib/common.constants';

export const getLandingStats = async () => {
  let data: LandingStats = { activeUsers: 0, annotationsCreated: 0, booksRegistered: 0, pagesRead: 0 };

  try {
    const url = new URL('/api/landing/stats', __URL__);
    const response = await fetch(url, { method: 'GET', cache: 'no-cache' });
    if (response.ok) {
      const responseData = (await response.json()) as LandingStatsGetResponse;
      if (responseData.data) data = responseData.data.stats;
    }
  } catch (err) {}

  return data;
};
