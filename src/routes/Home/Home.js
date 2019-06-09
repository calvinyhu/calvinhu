import React, { useEffect, useState } from 'react';
import throttle from 'raf-throttle';

import styles from './Home.module.scss';
import milestones from '../../assets/milestones/milestones';
import Cover from '../../components/Cover/Cover';
import Milestone from '../../components/Milestone/Milestone';

const Home = () => {
  const [offsetX, setOffsetX] = useState(0);

  useEffect(() => {
    const animatePage = (scrollTop, clientHeight) => {
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
