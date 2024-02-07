import type { LandingStatsGetResponse } from '@modules/api/types/landing-api.types';
import { __URL__ } from '@modules/common/lib/common.constants';

export const getLandingStats = async (): Promise<LandingStatsGetResponse> => {
  let data: LandingStatsGetResponse = { activeUsers: 0, annotationsCreated: 0, booksRegistered: 0, pagesRead: 0 };

  try {
    const url = new URL('/api/landing/stats', __URL__);
    const response = await fetch(url, { method: 'GET' });
    if (response.ok) {
      data = await response.json();
    }
  } catch (err) {
    /* empty */
  }

  return data;
};
