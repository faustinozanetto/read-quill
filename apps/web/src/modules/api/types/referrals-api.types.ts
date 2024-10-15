import { BaseApiResponse } from './api.types';

export interface ReferralsGetResponse extends BaseApiResponse {
  data?: {
    referralCode: string | null;
  };
}

export interface ReferralsCreatePostResponse extends BaseApiResponse {
  data?: {
    referralCode: string;
  };
}
