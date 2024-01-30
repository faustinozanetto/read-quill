import React from 'react';

interface HomeFeaturesCardProps {
  title: string;
  content: string;
  icon: React.JSX.Element;
}

const HomeFeaturesCard: React.FC<HomeFeaturesCardProps> = (props) => {
  const { title, content, icon } = props;

  return (
    <div className="border shadow rounded-lg p-6 sm:p-8 flex flex-col items-center justify-center ease-in-out text-center bg-background/60 group">
      <div className="p-4 rounded-full shadow-lg shadow-primary/50 mb-6 group-hover:scale-[105%]">{icon}</div>
      <span className="font-bold grow text-lg md:text-xl mb-4">{title}</span>
      <p>{content}</p>
    </div>
  );
};

export default HomeFeaturesCard;
