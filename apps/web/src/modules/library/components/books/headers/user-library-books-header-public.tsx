import React from 'react';

interface UserLibraryBooksHeaderPublicProps {
  title: string;
}

const UserLibraryBooksHeaderPublic: React.FC<UserLibraryBooksHeaderPublicProps> = (props) => {
  const { title } = props;

  return (
    <div className="flex flex-col rounded-lg border p-4 gap-2">
      <h1 className="text-2xl font-bold">{title}</h1>
      <p>
        Welcome to this reader's bookshelf! Here, you can explore all the books they've added and organized, offering a
        glimpse into their literary world. Browse through their collection and discover new titles and genres they
        enjoy. Their bookshelf is open for you to explore!
      </p>
    </div>
  );
};

export default UserLibraryBooksHeaderPublic;
