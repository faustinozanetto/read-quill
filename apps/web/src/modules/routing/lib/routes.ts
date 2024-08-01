export const PRIVATE_ROUTES = [
  '/dashboard',
  '/settings',
  '/library',
  '/community/post-thread',
  '/achievements',
  /^\/books\/[^/]+\/review-details$/,
];
export const PUBLIC_ROUTES = [
  '/',
  '/community',
  /^\/community\/threads\/[^\/]+$/,
  /^\/books\/[^\/]+$/,
  /^\/users\/[^\/]+$/,
  /^\/users\/[^\/]+\/books$/,
  /^\/users\/[^\/]+\/achievements$/,
];
export const DEFAULT_AUTHENTICATED_ROUTE = '/dashboard';
export const SIGN_IN_ROUTE = '/sign-in';
