import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getCurrentUser } from '@modules/auth/lib/auth.lib';
import UserBooks from '@modules/books/components/detailed/user-books';

export const metadata: Metadata = {
  title: 'User Books',
  description:
    'Discover Your Library at ReadQuill. Dive into your personalized collection, explore your bookshelf, and revel in the joy of your literary journey. Your books, your stories, all in one place – welcome to the Books page at ReadQuill.',
};

export default async function BooksPage(): Promise<React.JSX.Element> {
  const user = await getCurrentUser();
  if (!user) return redirect('/sign-in');

  return (
    <div className="container my-4">
      <UserBooks />
    </div>
  );
}
