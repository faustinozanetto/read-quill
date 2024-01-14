import { getCurrentUser } from '@modules/auth/lib/auth.lib';
import UserBooks from '@modules/books/components/user/user-books';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'User Books',
  description: 'Keep track and manage your shortened URLs in one place.',
};

export default async function BooksPage() {
  const user = await getCurrentUser();
  if (!user) return redirect('/sign-in');

  return (
    <div className="container my-4 md:my-8 ">
      <UserBooks />
    </div>
  );
}
