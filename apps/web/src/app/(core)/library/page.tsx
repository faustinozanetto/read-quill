import type { Metadata } from 'next';

import UserLibrary from '@modules/library/components/user-library';

export const metadata: Metadata = {
  title: 'Your Library',
  description:
    'Discover Your Library at ReadQuill. Dive into your personalized collection, explore your bookshelf, and revel in the joy of your literary journey. Your books, your stories, all in one place – welcome to the Books page at ReadQuill.',
};

export default async function LibraryPage() {
  return (
    <div className="container my-4">
      <UserLibrary />
    </div>
  );
}
