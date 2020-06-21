import React, { useEffect, useState, FC } from 'react';
// @ts-ignore
import throttle from 'raf-throttle';

import Cover from 'components/Cover/Cover';
import Milestone from 'components/Milestone/Milestone';
import { useResetScrollOnUnmount } from 'utils/hooks';

import milestones from 'constants/milestones';

interface HomeProps {
  path: string;
}

const Home: FC<HomeProps> = () => {
  const [offsetX, setOffsetX] = useState(0);

  useEffect(() => {
    const animatePage = (scrollTop: number, clientHeight: number) => {
      if (scrollTop < clientHeight) setOffsetX(-scrollTop / 10);
    };

    const handleScroll = () => {
      throttle(animatePage(window.pageYOffset, window.innerHeight));
    };

    const event = 'scroll';
    window.addEventListener(event, handleScroll);

    return () => {
      window.removeEventListener(event, handleScroll);
    };
  });

  useResetScrollOnUnmount();

  return (
    <>
      <Cover offsetX={offsetX} />
      {Object.values(milestones).map(
        ({ title, alt, date, description, photo, url, urlTitle }) => (
          <Milestone
            key={title}
            alt={alt}
            date={date}
            description={description}
            photo={photo}
            title={title}
            url={url}
            urlTitle={urlTitle}
          />
        ),
      )}
    </>
  );
};

export default Home;
