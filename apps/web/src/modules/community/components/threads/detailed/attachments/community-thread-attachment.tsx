import { ThreadAttachment } from '@read-quill/database';
import { DialogTrigger, Skeleton } from '@read-quill/design-system';
import Image from 'next/image';
import React from 'react';

interface CommunityThreadAttachmentProps {
  attachment: ThreadAttachment;
  onSelected: () => void;
}

const CommunityThreadAttachment: React.FC<CommunityThreadAttachmentProps> = (props) => {
  const { attachment, onSelected } = props;

  return (
    <div className="border rounded-lg shadow hover:border-primary transition-all hover:scale-[102%]">
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

export default CommunityThreadAttachment;
