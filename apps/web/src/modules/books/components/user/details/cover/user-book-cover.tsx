import React from 'react';
import Image from 'next/image';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from '@read-quill/design-system';
import { Image as DBImage } from '@read-quill/database';
import { getImagePublicUrl } from '@modules/images/lib/images.lib';

interface UserBookCoverProps {
  image: DBImage;
}

const UserBookCover: React.FC<UserBookCoverProps> = (props) => {
  const { image } = props;

  const completeUrl = getImagePublicUrl('BookCovers', image.path);

  return (
    <Dialog>
      <DialogTrigger>
        <Image
          alt="Book Cover"
          aria-label="Book Cover"
          className="h-80 w-full rounded-lg border shadow object-cover object-center lg:h-[350px] md:h-[250px] md:w-40 lg:w-60"
          draggable={false}
          height={512}
          priority
          src={completeUrl}
          width={512}
        />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Book Cover</DialogTitle>
        </DialogHeader>
        <Image
          alt="Book Cover"
          aria-label="Book Cover"
          className="w-full rounded-lg border shadow object-cover object-center"
          draggable={false}
          height={1024}
          src={completeUrl}
          width={1024}
        />
      </DialogContent>
    </Dialog>
  );
};

export default UserBookCover;
