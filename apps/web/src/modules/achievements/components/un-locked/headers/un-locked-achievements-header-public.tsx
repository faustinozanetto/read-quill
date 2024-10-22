import React from 'react';

interface UnLockedAchievementsHeaderPublicProps {
  title: string;
}

const UnLockedAchievementsHeaderPublic: React.FC<UnLockedAchievementsHeaderPublicProps> = (props) => {
  const { title } = props;

  return (
    <div className="flex flex-col rounded-lg border p-4 gap-2">
      <h1 className="text-2xl font-bold">{title}</h1>
      <p>
        Explore the unlocked achievements of this avid reader. See the significant milestones they've reached,
        reflecting their dedication and passion for reading. Celebrate their journey and get inspired by the progress
        they've made. Their achievements tell a story of commitment and enthusiasm!
      </p>
    </div>
  );
};

export default UnLockedAchievementsHeaderPublic;
