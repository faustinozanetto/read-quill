import { ThreadAttachment } from '@read-quill/database';
import { DialogTrigger, Skeleton } from '@read-quill/design-system';
import Image from 'next/image';
import React from 'react';
import CommunityThreadAttachmentManagement from './management/community-thread-attachment-management';

interface CommunityThreadAttachmentCardProps {
  attachment: ThreadAttachment;
  threadId: string;
  onSelected: () => void;
}

const CommunityThreadAttachmentCard: React.FC<CommunityThreadAttachmentCardProps> = (props) => {
  const { attachment, threadId, onSelected } = props;

  return (
    <div className="border rounded-lg shadow hover:border-primary transition-all hover:scale-[102%] relative">
      <div className="absolute top-2 right-2">
        <CommunityThreadAttachmentManagement attachment={attachment} threadId={threadId} />
      </div>
      <DialogTrigger className="w-full" onClick={onSelected}>
        <Image
          src={attachment.attachmentImage}
          alt={attachment.description}
          width={400}
          height={400}
          className="rounded-t-lg max-h-40 w-full object-cover"
        />
      </DialogTrigger>
      <p className="text-center mx-auto text-sm my-2">{attachment.description}</p>
    </div>
  );
};

export default CommunityThreadAttachmentCard;
