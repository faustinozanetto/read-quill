import React from 'react';

const Community: React.FC = () => {
  return (
    <section className="mx-auto flex flex-col gap-4">
      <div className="rounded-lg border p-4 shadow">
        <h1 className="leading-2 block text-xl font-bold md:text-2xl lg:text-3xl">Welcome to the Community</h1>

        <p className="mt-2">
          Track progress, explore recommendations, and enjoy a personalized literary hub. Happy reading!
        </p>
      </div>
    </section>
  );
};

export default Community;
