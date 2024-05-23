import React from 'react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Skeleton,
} from '@read-quill/design-system';
import CommunityThreadAttachment from './community-thread-attachment-card';
import { useCommunityThreadAttachmentsStore } from '@modules/community/state/community-thread-attachments.slice';
import Image from 'next/image';
import { useThreadAttachments } from '@modules/community/hooks/threads/attachments/use-thread-attachments';

interface CommunityThreadAttachmentsProps {
  threadId: string;
}

const CommunityThreadAttachments: React.FC<CommunityThreadAttachmentsProps> = (props) => {
  const { threadId } = props;

  const { selectedAttachment, setSelectedAttachment } = useCommunityThreadAttachmentsStore();
  const { data, isFetching, isLoading } = useThreadAttachments({ threadId });

  return (
    <div className="border p-4 rounded-lg shadow">
      <h3 className="text-xl font-bold mb-2">Attachments</h3>
      {isFetching || isLoading ? (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-40 w-full" />
          ))}
        </div>
      ) : null}

      {!(isFetching || isLoading) && data.attachments.length > 0 ? (
        <Dialog>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-2">
            {data.attachments.map((attachment) => (
              <CommunityThreadAttachment
                key={attachment.id}
                attachment={attachment}
                threadId={threadId}
                onSelected={() => setSelectedAttachment(attachment)}
              />
            ))}
          </div>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Thread Attachment Details</DialogTitle>
            </DialogHeader>
            {selectedAttachment && (
              <div className="space-y-2">
                <Image
                  className="rounded-lg border shadow"
                  src={selectedAttachment.attachmentImage}
                  alt={selectedAttachment.description}
                  width={1000}
                  height={1000}
                />
                <p className="mx-auto text-center">{selectedAttachment.description}</p>
              </div>
            )}
          </DialogContent>
        </Dialog>
      ) : null}

      {!(isFetching || isLoading) && data.attachments.length === 0 ? (
        <p>This thread does not seem to have any attachments!</p>
      ) : null}
    </div>
  );
};

export default CommunityThreadAttachments;
