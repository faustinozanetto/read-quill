import React from 'react';
import UserBookReview from './review/user-book-review';
import UserBookAnnotations from './annotations/user-book-annotations';
import UserBookReadRegistries from './read-registries/user-book-read-registries';
import UserBookInsights from './insights/user-book-insights';
import UserBookReadActivity from './read-activity/user-book-read-activity';

const UserBook: React.FC = () => {
  return (
    <section className="space-y-4">
      <UserBookInsights />
      <UserBookReview />
      <UserBookAnnotations />
      <UserBookReadRegistries />
      <UserBookReadActivity />
    </section>
  );
};

export default UserBook;
