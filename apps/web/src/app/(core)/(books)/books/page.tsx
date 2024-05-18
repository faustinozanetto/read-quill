import type { Metadata } from 'next';
import UserBooks from '@modules/books/components/detailed/user-books';
import { auth } from 'auth';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'User Books',
  description:
    'Discover Your Library at ReadQuill. Dive into your personalized collection, explore your bookshelf, and revel in the joy of your literary journey. Your books, your stories, all in one place – welcome to the Books page at ReadQuill.',
};

export default async function BooksPage() {
  const session = await auth();
  if (!session) return redirect('/');

  return (
    <div className="container my-4">
      <UserBooks userId={session.user.id} />
    </div>
  );
}
