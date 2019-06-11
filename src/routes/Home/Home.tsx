import React, { useEffect, useState } from 'react';
// @ts-ignore
import throttle from 'raf-throttle';

import Cover from 'components/Cover/Cover';
import Milestone from 'components/Milestone/Milestone';
import { useResetScrollOnUnmount } from 'utils/hooks';

import styles from './Home.module.scss';
import milestones from 'assets/milestones/milestones';

const Home = () => {
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

  const renderMilestones = () =>
    Object.values(milestones).map(val => (
      <Milestone
        key={val.title}
        alt={val.alt}
        date={val.date}
        description={val.description}
        photo={val.photo}
        title={val.title}
        url={val.url}
        urlTitle={val.urlTitle}
      />
    ));

  return (
    <div className={styles.Home}>
      <Cover offsetX={offsetX} />
      {renderMilestones()}
    </div>
  );
};

export default Home;
