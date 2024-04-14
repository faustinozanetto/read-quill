import React from 'react';
import CommunityThreads from './threads/community-threads';

const Community: React.FC = () => {
  return (
    <section className="mx-auto flex flex-col gap-4">
      <div className="rounded-lg border p-4 shadow">
        <h1 className="leading-2 block text-xl font-bold md:text-2xl lg:text-3xl">Welcome to the Community</h1>
        <p className="mt-2 text-sm md:text-base">
          Welcome to our vibrant community hub! Join the conversation, share your thoughts, and connect with fellow book
          enthusiasts from around the world.
        </p>
      </div>
      <CommunityThreads />
    </section>
  );
};

export default Community;
