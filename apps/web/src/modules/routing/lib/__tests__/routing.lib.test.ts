import '@testing-library/jest-dom';
import { checkIsRoute } from '@modules/routing/lib/routing.lib';

describe('checkIsRoute', () => {
  test('matches exact string routes', () => {
    const routes = ['/community', '/books', '/'];
    expect(checkIsRoute(routes, '/community')).toBe(true);
    expect(checkIsRoute(routes, '/books')).toBe(true);
    expect(checkIsRoute(routes, '/')).toBe(true);
  });

  test('does not match non-existent string routes', () => {
    const routes = ['/community', '/books', '/'];
    expect(checkIsRoute(routes, '/non-existent')).toBe(false);
  });

  test('matches regex routes', () => {
    const routes = [/^\/books\/[a-zA-Z0-9_-]+$/, '/community'];
    expect(checkIsRoute(routes, '/books/123')).toBe(true);
    expect(checkIsRoute(routes, '/books/abc')).toBe(true);
    expect(checkIsRoute(routes, '/books/123-abc')).toBe(true);
  });

  test('does not match invalid regex routes', () => {
    const routes = [/^\/books\/[a-zA-Z0-9_-]+$/, '/community'];
    expect(checkIsRoute(routes, '/books/')).toBe(false);
    expect(checkIsRoute(routes, '/books/!@#')).toBe(false);
  });

  test('returns false for non-string or non-regex route types', () => {
    const routes = ['/community'];
    expect(checkIsRoute(routes, '/community')).toBe(true);
    expect(checkIsRoute(routes, '/')).toBe(false);
  });

  test('handles empty routes array', () => {
    const routes: string[] = [];
    expect(checkIsRoute(routes, '/community')).toBe(false);
  });
});
