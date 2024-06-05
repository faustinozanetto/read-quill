export const PRIVATE_ROUTES = ['/dashboard', '/settings', '/library', '/community/threads/create', '/achievements'];
export const PUBLIC_ROUTES = ['/community', /^\/community\threads\/[a-zA-Z0-9_-]+$/, '/', /^\/books\/[a-zA-Z0-9_-]+$/];
export const DEFAULT_AUTHENTICATED_ROUTE = '/dashboard';
export const SIGN_IN_ROUTE = '/sign-in';
