'use client';

import React from 'react';

import { Dialog, DialogContent, DialogHeader, DialogTitle, Skeleton } from '@read-quill/design-system';
import CommunityThreadAttachment from './community-thread-attachment-card';
import { useCommunityThreadAttachmentsStore } from '@modules/community/state/community-thread-attachments.slice';
import Image from 'next/image';
import { useThreadAttachments } from '@modules/community/hooks/threads/attachments/use-thread-attachments';
import { getImagePublicUrl } from '@modules/images/lib/images.lib';

import { useThreadStore } from '@modules/community/state/thread/thread.slice';

const CommunityThreadAttachments: React.FC = () => {
  const { thread } = useThreadStore();
  const { selectedAttachment, setSelectedAttachment } = useCommunityThreadAttachmentsStore();
  const { data, isLoading } = useThreadAttachments({ threadId: thread?.id });

  return (
    <div className="border p-4 rounded-lg shadow">
      <h3 className="text-xl font-bold mb-2">Attachments</h3>
      {isLoading ? (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-40 w-full" />
          ))}
        </div>
      ) : null}

      {!isLoading && thread && data && data.attachments.length ? (
        <Dialog>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-2">
            {data.attachments.map((attachment) => (
              <CommunityThreadAttachment
                key={attachment.id}
                attachment={attachment}
                threadId={thread.id}
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
                  src={getImagePublicUrl('ThreadAttachments', selectedAttachment.image.path)}
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

      {!isLoading && data && !data.attachments.length ? (
        <p>This thread does not seem to have any attachments!</p>
      ) : null}
    </div>
  );
};

export default CommunityThreadAttachments;
