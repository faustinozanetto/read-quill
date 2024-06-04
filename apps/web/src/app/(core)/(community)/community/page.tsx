import type { Metadata } from 'next';
import Community from '@modules/community/components/community';

export const metadata: Metadata = {
  title: 'Community',
  description:
    'Join the vibrant ReadQuill Community to stay updated with the latest threads and trending discussions. Engage with fellow readers, share your thoughts, and explore diverse literary topics. Whether you are seeking recommendations or looking to dive into in-depth book discussions, the ReadQuill Community is your hub for all things literary.',
};

export default function CommunityPage(): React.JSX.Element {
  return <Community />;
}
