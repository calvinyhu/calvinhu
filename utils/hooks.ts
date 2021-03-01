import { useEffect, useState } from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import throttle from 'raf-throttle';

export const useResetScrollOnUnmount = () => {
  const [currentPath] = useState(typeof window !== 'undefined' ? window.location.pathname : undefined);

  useEffect(() => {
    return () => {
      const nextPath = window.location.pathname;
      if (nextPath !== currentPath && window.pageYOffset) window.scrollTo({ top: 0 });
    };
  }, [currentPath]);
};

export const useScrollPositionFlag = (
  flag: boolean,
  setFlag: React.Dispatch<React.SetStateAction<boolean>>,
  threshold: number,
) => {
  useEffect(() => {
    const animatePage = (scrollTop: number, clientHeight: number) => {
      if (flag && scrollTop < clientHeight) setFlag(false);
      if (!flag && scrollTop >= clientHeight) setFlag(true);
    };

    const handleScroll = () => {
      throttle(animatePage(window.pageYOffset, threshold));
    };

    const event = 'scroll';
    window.addEventListener(event, handleScroll);

    return () => {
      window.removeEventListener(event, handleScroll);
    };
  });
};
