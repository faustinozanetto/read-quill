import React from 'react';
import Image from 'next/image';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, cn } from '@read-quill/design-system';
import { Image as DBImage } from '@read-quill/database';
import { getImagePublicUrl } from '@modules/images/lib/images.lib';
import { BookPlaceholderImage } from '@modules/books/types/book.types';

interface UserBookCoverProps extends React.ComponentPropsWithoutRef<typeof DialogTrigger> {
  image: DBImage;
  placeholderImage: BookPlaceholderImage;
  imageClassNames?: string;
}

const UserBookCover: React.FC<UserBookCoverProps> = (props) => {
  const { image, placeholderImage, imageClassNames, ...rest } = props;

  return (
    <Dialog>
      <DialogTrigger {...rest}>
        <Image
          key={image.path}
          alt="Book Cover"
          title="Book Cover"
          className={cn(
            'h-80 w-full rounded-lg border shadow object-cover object-center lg:h-[350px] md:h-[250px]',
            imageClassNames
          )}
          src={getImagePublicUrl('BookCovers', image.path)}
          width={600}
          height={600}
          placeholder="blur"
          blurDataURL={placeholderImage.blurUrl}
        />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Book Cover</DialogTitle>
        </DialogHeader>
        <Image
          src={getImagePublicUrl('BookCovers', image.path)}
          alt="Book Cover"
          aria-label="Book Cover"
          className="w-full rounded-lg border shadow object-cover object-center"
          draggable={false}
          height={2000}
          width={2000}
          placeholder="blur"
          blurDataURL={placeholderImage.blurUrl}
        />
      </DialogContent>
    </Dialog>
  );
};

export default UserBookCover;
