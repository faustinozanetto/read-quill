export const checkIsRoute = (routes: (string | RegExp)[], path: string) => {
  return routes.some((route) => {
    if (typeof route === 'string') return path === route;
    if (route instanceof RegExp) return route.test(path);
    return false;
  });
};
