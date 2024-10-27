import { BaseApiResponse } from './api.types';

export interface ReferralsGetResponse extends BaseApiResponse {
  data?: {
    referralCodes: {
      referralCode: string | null;
      name: string | null;
      avatar: {
        path: string;
      } | null;
    }[];
  };
}

export interface ReferralsUserGetResponse extends BaseApiResponse {
  data?: {
    referralCode: string | null;
  };
}

export interface ReferralsCreatePostResponse extends BaseApiResponse {
  data?: {
    referralCode: string;
  };
}

export interface ReferralsUseGetResponse extends BaseApiResponse {
  data?: {
    usedReferralCode: string | null;
  };
}

export interface ReferralsChangePostResponse extends BaseApiResponse {
  data?: {
    success: boolean;
  };
}
