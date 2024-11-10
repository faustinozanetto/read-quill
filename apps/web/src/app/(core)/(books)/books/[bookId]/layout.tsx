import React from 'react';
import { notFound } from 'next/navigation';
import { __URL__ } from '@modules/common/lib/common.constants';
import { BookGetResponse } from '@modules/api/types/books-api.types';
import { BookProvider } from '@modules/books/components/state/book-provider';
import Script from 'next/script';
import { generateBookRichResults } from '@modules/rich-results/lib/book-rich-results';
import { auth } from 'auth';
import UserBookDetails from '@modules/books/components/user/details/user-book-details';

interface BookPageLayoutProps {
  params: {
    bookId: string;
  };
  children: React.ReactNode;
}

const fetchBookData = async (bookId: string): Promise<BookGetResponse | undefined> => {
  try {
    const url = new URL('/api/book', __URL__);
    url.searchParams.set('bookId', bookId);

    const response = await fetch(url.toString(), { method: 'GET', cache: 'no-store' });

    return response.json();
  } catch (error) {
    return undefined;
  }
};

export default async function BookLayout(props: BookPageLayoutProps) {
  const { children, params } = props;
  const { bookId } = params;

  const bookData = await fetchBookData(bookId);

  if (!bookData?.data?.book) {
    return notFound();
  }

  const book = bookData.data.book;

  const { reader, image, ...restBook } = book;

  const session = await auth();
  const isBookOwner = session?.user.id === book?.readerId;

  const richResults = generateBookRichResults(restBook, image, reader);

  return (
    <BookProvider book={bookData.data.book} isBookOwner={isBookOwner}>
      <section className="space-y-4">
        <UserBookDetails />
        {children}
      </section>

      <Script
        strategy="beforeInteractive"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(richResults) }}
      />
    </BookProvider>
  );
}
