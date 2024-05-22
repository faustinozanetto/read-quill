import { ThreadAttachment } from '@read-quill/database';
import { create } from 'zustand';

export interface CommunityThreadAttachmentsSliceState {
  selectedAttachment: ThreadAttachment | null;
}

export interface CommunityThreadAttachmentsSliceActions {
  setSelectedAttachment: (selectedAttachment: ThreadAttachment) => void;
}

export const useCommunityThreadAttachmentsStore = create<
  CommunityThreadAttachmentsSliceState & CommunityThreadAttachmentsSliceActions
>((set) => ({
  selectedAttachment: null,
  setSelectedAttachment(selectedAttachment) {
    set({ selectedAttachment });
  },
}));
