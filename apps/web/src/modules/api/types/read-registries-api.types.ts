import { ReadRegistry } from '@read-quill/database';

export interface ReadRegistryPostResponse {
  readRegistry: ReadRegistry;
}

export interface ReadRegistryPatchResponse {
  readRegistry: ReadRegistry;
}

export interface ReadRegistryDeleteResponse {
  success: boolean;
}
