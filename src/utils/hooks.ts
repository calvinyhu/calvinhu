import { useEffect, useState } from 'react';

export const useResetScrollOnUnmount = () => {
  const [currentPath] = useState(window.location.pathname);

  useEffect(() => {
    return () => {
      const nextPath = window.location.pathname;
      if (nextPath !== currentPath && window.pageYOffset)
        window.scrollTo({ top: 0 });
    };
  }, [currentPath]);
};
