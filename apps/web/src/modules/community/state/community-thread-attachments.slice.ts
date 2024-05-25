import { create } from 'zustand';
import { ThreadAttachmentWithImage } from '../types/community.types';

export interface CommunityThreadAttachmentsSliceState {
  selectedAttachment: ThreadAttachmentWithImage | null;
}

export interface CommunityThreadAttachmentsSliceActions {
  setSelectedAttachment: (selectedAttachment: ThreadAttachmentWithImage) => void;
}

export const useCommunityThreadAttachmentsStore = create<
  CommunityThreadAttachmentsSliceState & CommunityThreadAttachmentsSliceActions
>((set) => ({
  selectedAttachment: null,
  setSelectedAttachment(selectedAttachment) {
    set({ selectedAttachment });
  },
}));
