import { Book, WithContext } from 'schema-dts';
import { getImagePublicUrl } from '@modules/images/lib/images.lib';
import { Review, Book as PrismaBook, Image, User } from '@read-quill/database';

export const generateBookRichResults = (
  book: PrismaBook,
  bookImage: Image,
  reader: User,
  review?: Review | null
): WithContext<Book> => ({
  '@context': 'https://schema.org',
  '@type': 'Book',
  name: book.name,
  author: {
    '@type': 'Person',
    name: book.author,
  },
  bookFormat: 'https://schema.org/Hardcover',
  numberOfPages: book.pageCount,
  inLanguage: book.language,
  image: getImagePublicUrl('BookCovers', bookImage.path),
  review: review
    ? {
        '@type': 'Review',
        author: {
          '@type': 'Person',
          name: reader.name!,
        },
        datePublished: new Date(review.createdAt).toISOString().split('T')[0],
        reviewBody: review.content,
        reviewRating: {
          '@type': 'Rating',
          ratingValue: book.rating ?? 5,
          bestRating: 5,
        },
      }
    : undefined,
});
