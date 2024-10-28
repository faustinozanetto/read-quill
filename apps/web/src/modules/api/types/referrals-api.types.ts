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

export interface ReferralsPostResponse extends BaseApiResponse {
  data?: {
    referralCode: string;
  };
}

export interface ReferralsPatchResponse extends BaseApiResponse {
  data?: {
    referralCode: string;
  };
}

export interface ReferralsDeleteResponse extends BaseApiResponse {
  data?: {
    success: boolean;
  };
}

export interface ReferralsUsedGetResponse extends BaseApiResponse {
  data?: {
    usedReferralCode: string | null;
  };
}

export interface ReferralsUsedPostResponse extends BaseApiResponse {
  data?: {
    success: boolean;
  };
}

export interface ReferralsUsedDeleteResponse extends BaseApiResponse {
  data?: {
    success: boolean;
  };
}
