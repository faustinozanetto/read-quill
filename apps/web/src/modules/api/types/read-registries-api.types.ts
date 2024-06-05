import { ReadRegistry } from '@read-quill/database';
import { BaseApiResponse } from './api.types';

export interface ReadRegistryPostResponse extends BaseApiResponse {
  data?: { readRegistry: ReadRegistry };
}

export interface ReadRegistryPatchResponse extends BaseApiResponse {
  data?: { readRegistry: ReadRegistry };
}

export interface ReadRegistryDeleteResponse extends BaseApiResponse {
  data?: { success: boolean };
}
