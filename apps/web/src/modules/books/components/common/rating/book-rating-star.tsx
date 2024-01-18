import React from 'react';
import { Button, StarIcon, cn } from '@read-quill/design-system';
import { __URL__ } from '@modules/common/lib/common.constants';
import { useIsBookOwner } from '@modules/books/hooks/use-is-book-owner';

interface BookRatingStarProps {
  /** The stateful rating of the book */
  stateRating: number;
  /** The book rating */
  bookRating: number | null;
  /** The value associated with this star */
  value: number;
  /** Wether the rating is loading or not */
  isLoading: boolean;
  /** Callback for the onClick event */
  onClick: NonNullable<React.HTMLProps<HTMLButtonElement>['onClick']>;
  /**
   * Set rating function
   * @param rating - Rating value
   * @returns void
   */
  setRating: (rating: number) => void;
}

const BookRatingStar: React.FC<BookRatingStarProps> = (props) => {
  const { stateRating, bookRating, value, onClick, isLoading, setRating } = props;

  const { isBookOwner } = useIsBookOwner();

  const handleRatingClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    if (!isBookOwner) return;

    onClick(event);
  };

  const handleRatingPointerEnter = (): void => {
    if (!isBookOwner) return;

    setRating(value + 1);
  };

  const handleRatingPointerLeave = (): void => {
    if (!isBookOwner) return;

    setRating(bookRating ?? -1);
  };

  const isSelectedRange = value + 1 <= stateRating;

  return (
    <Button
      className="w-7 h-7"
      disabled={isLoading}
      onClick={handleRatingClick}
      onPointerEnter={handleRatingPointerEnter}
      onPointerLeave={handleRatingPointerLeave}
      size="icon"
      variant="ghost"
    >
      <StarIcon
        className={cn(
          'stroke-current ',
          isBookOwner && 'hover:fill-primary hover:stroke-primary',
          isSelectedRange && 'fill-primary stroke-primary'
        )}
        size="sm"
      />
    </Button>
  );
};

export default BookRatingStar;
