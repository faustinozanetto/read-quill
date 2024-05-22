import type { Metadata } from 'next';
import CreateThread from '@modules/community/components/threads/create/create-thread';

export const metadata: Metadata = {
  title: 'Create Thread',
  description:
    'Discover Your Library at ReadQuill. Dive into your personalized collection, explore your bookshelf, and revel in the joy of your literary journey. Your books, your stories, all in one place – welcome to the Books page at ReadQuill.',
};

export default function CreateThreadPage(): React.JSX.Element {
  return (
    <div className="container my-4 px-4">
      <CreateThread />
    </div>
  );
}
