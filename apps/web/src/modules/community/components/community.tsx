import React from 'react';
import CommunityThreads from './threads/latest/community-threads';
import CommunityTrendingThreads from './threads/trending/community-trending-threads';
import CommunityTopUsers from './top-users/community-top-users';

const Community: React.FC = () => {
  return (
    <section className="mx-auto gap-4 flex flex-col max-w-[100rem]">
      <div className="rounded-lg border p-4 shadow">
        <h1 className="leading-2 block text-xl font-bold md:text-2xl lg:text-3xl">Welcome to the Community</h1>
        <p className="mt-2 text-sm md:text-base">
          Welcome to our vibrant community hub! Join the conversation, share your thoughts, and connect with fellow book
          enthusiasts from around the world.
        </p>
      </div>
      <CommunityTopUsers />
      <div className="gap-4 flex flex-col 2xl:flex-row-reverse relative">
        <div className="2xl:max-w-[550px]">
          <CommunityTrendingThreads />
        </div>
        <CommunityThreads />
      </div>
    </section>
  );
};

export default Community;
