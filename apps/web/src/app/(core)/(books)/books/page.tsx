import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getCurrentUser } from '@modules/auth/lib/auth.lib';
import UserBooks from '@modules/books/components/detailed/user-books';

export const metadata: Metadata = {
  title: 'User Books',
  description: 'Keep track and manage your shortened URLs in one place.',
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
