import '@testing-library/jest-dom';
import { capitalize } from '../common.lib';

describe('capitalize', () => {
  it('capitalizes the first letter of a string', () => {
    const result = capitalize('hello');
    expect(result).toBe('Hello');
  });

  it('handles an empty string', () => {
    const result = capitalize('');
    expect(result).toBe('');
  });

  it('handles a single-character string', () => {
    const result = capitalize('a');
    expect(result).toBe('A');
  });

  it('handles a string with already capitalized first letter', () => {
    const result = capitalize('Hello');
    expect(result).toBe('Hello');
  });

  it('handles a string with already capitalized first letter and other lowercase letters', () => {
    const result = capitalize('hELLO');
    expect(result).toBe('HELLO');
  });

  it('handles a string with spaces', () => {
    const result = capitalize('hello world');
    expect(result).toBe('Hello world');
  });
});
