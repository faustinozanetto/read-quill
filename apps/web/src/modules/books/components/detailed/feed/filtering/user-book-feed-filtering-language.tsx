import { Label, Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@read-quill/design-system';
import type { ComponentPropsWithoutRef } from 'react';
import React from 'react';
import { BOOK_LANGUAGES } from '@modules/books/lib/book.constants';

interface UserBooksFeedFilteringLanguageProps {
  onValueChange: ComponentPropsWithoutRef<typeof Select>['onValueChange'];
}

const UserBooksFeedFilteringLanguage: React.FC<UserBooksFeedFilteringLanguageProps> = (props) => {
  const { onValueChange } = props;

  const languages = ['All', ...BOOK_LANGUAGES];

  return (
    <div className="flex flex-col gap-2">
      <Label>Language</Label>
      <Select defaultValue={languages[0]} onValueChange={onValueChange}>
        <SelectTrigger>
          <SelectValue placeholder="Book language" />
        </SelectTrigger>
        <SelectContent>
          {languages.map((language) => {
            return (
              <SelectItem key={language} value={language}>
                {language}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
};

export default UserBooksFeedFilteringLanguage;
