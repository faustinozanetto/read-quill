import type { Metadata } from 'next';
import CreateThread from '@modules/community/components/threads/create/create-thread';

export const metadata: Metadata = {
  title: 'Create Thread',
  description:
    'Start a new discussion in our community by creating a thread. Share your thoughts, ask questions, and engage with fellow members. This page allows you to contribute to the conversation, connect with others, and become an active participant in our community. Create your thread now and join the dialogue!',
};

export default function CreateThreadPage(): React.JSX.Element {
  return <CreateThread />;
}
