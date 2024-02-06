import React from 'react';
import { Select, SelectContent, SelectTrigger, SelectValue, SelectItem } from '@read-quill/design-system';
import type { UseFilterActionsReturn } from '@modules/filters/hooks/use-filter-actions';
import FilterSection from '@modules/filters/components/filter-section';
import { BOOK_LANGUAGES } from '@modules/books/lib/book.constants';

interface UserBookFilteringLanguageProps {
  filterLanguage: string;
  onFilterLanguageChange: (value: string) => void;
  onResetFilter: UseFilterActionsReturn<unknown>['resetFilter'];
}

const UserBookFilteringLanguage: React.FC<UserBookFilteringLanguageProps> = (props) => {
  const { filterLanguage, onFilterLanguageChange, onResetFilter } = props;

  const languages = ['All', ...BOOK_LANGUAGES];

  return (
    <FilterSection onResetFilter={onResetFilter} title="Language">
      <Select
        onValueChange={(value) => {
          onFilterLanguageChange(value);
        }}
        value={filterLanguage}
      >
        <SelectTrigger className="grow">
          <SelectValue placeholder="English" />
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
    </FilterSection>
  );
};

export default UserBookFilteringLanguage;
