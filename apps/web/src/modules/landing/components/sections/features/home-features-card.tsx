import React from 'react';

interface HomeFeaturesCardProps {
  title: string;
  content: string;
  icon: React.JSX.Element;
}

const HomeFeaturesCard: React.FC<HomeFeaturesCardProps> = (props) => {
  const { title, content, icon } = props;

  return (
    <div className="border shadow rounded-lg p-6 sm:p-8 flex flex-col items-center justify-center text-center bg-background/60 backdrop-blur-md">
      <div className="p-4 rounded-full shadow-lg shadow-primary/50 mb-6">{icon}</div>
      <span className="font-bold grow text-lg mb-4">{title}</span>
      <p className="opacity-80">{content}</p>
    </div>
  );
};

export default HomeFeaturesCard;
