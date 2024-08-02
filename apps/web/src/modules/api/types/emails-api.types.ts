import { BaseApiResponse } from './api.types';

export interface EmailSendPostResponse extends BaseApiResponse {
  data?: { sent: boolean };
}
