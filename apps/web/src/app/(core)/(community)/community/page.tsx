import type { Metadata } from 'next';
import Community from '@modules/community/components/community';

export const metadata: Metadata = {
  title: 'Community',
  description:
    'Discover Your Library at ReadQuill. Dive into your personalized collection, explore your bookshelf, and revel in the joy of your literary journey. Your books, your stories, all in one place – welcome to the Books page at ReadQuill.',
};

export default function CommunityPage(): React.JSX.Element {
  return (
    <div className="my-4 px-4">
      <Community />
    </div>
  );
}
