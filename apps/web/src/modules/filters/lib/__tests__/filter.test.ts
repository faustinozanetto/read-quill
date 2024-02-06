import type { Filter } from '@modules/filters/hooks/use-filter-data';
import { constructFiltersRecordFromArray } from '../filter.lib';
import '@testing-library/jest-dom';

describe('constructFiltersRecordFromArray', () => {
  it('creates a record from an array of filters', () => {
    const filters: Filter<User>[] = [
      { property: 'name', value: 'John', shouldEnable: (value) => (value as string) !== '' },
      { property: 'age', value: 25, shouldEnable: (value) => (value as number) > 0 },
    ];

    const filtersRecord = constructFiltersRecordFromArray(filters);

    expect(filtersRecord).toEqual({
      name: { property: 'name', value: 'John', shouldEnable: expect.any(Function) },
      age: { property: 'age', value: 25, shouldEnable: expect.any(Function) },
    });
  });

  it('handles an empty array of filters', () => {
    const filters: Filter<User>[] = [];

    const filtersRecord = constructFiltersRecordFromArray(filters);

    expect(filtersRecord).toEqual({});
  });

  it('handles filters with the same property', () => {
    const filters: Filter<User>[] = [
      { property: 'name', value: 'John', shouldEnable: (value) => value !== '' },
      { property: 'name', value: 'Doe', shouldEnable: (value) => value !== '' },
    ];

    const filtersRecord = constructFiltersRecordFromArray(filters);

    expect(filtersRecord).toEqual({
      name: { property: 'name', value: 'Doe', shouldEnable: expect.any(Function) },
    });
  });

  it('handles filters with different types of properties', () => {
    const filters: Filter<User>[] = [
      { property: 'name', value: 'John', shouldEnable: (value) => value !== '' },
      { property: 'age', value: 25, shouldEnable: (value) => (value as number) > 0 },
      { property: 'city', value: 'New York', shouldEnable: (value) => value !== '' },
    ];

    const filtersRecord = constructFiltersRecordFromArray(filters);

    expect(filtersRecord).toEqual({
      name: { property: 'name', value: 'John', shouldEnable: expect.any(Function) },
      age: { property: 'age', value: 25, shouldEnable: expect.any(Function) },
      city: { property: 'city', value: 'New York', shouldEnable: expect.any(Function) },
    });
  });
});

// Sample User type for demonstration purposes
interface User {
  name: string;
  age: number;
  city: string;
}
