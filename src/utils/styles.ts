export const hideNavOnPathname = (pathname: string) => {
  const pathnames = ['/photo', '/order'];
  return pathnames.some((name) => name === pathname);
};
