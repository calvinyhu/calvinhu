import React, { useCallback, useEffect } from 'react';
import { useSpring, animated, interpolate } from 'react-spring';

import Fa from '../UI/Fa/Fa';
import Button from '../UI/Button/Button';
import packageJson from '../../../package.json';

import styles from './Cover.module.scss';
import p1080 from '../../assets/images/DSC_9569-1080p50-blurred.jpg';
import p1440 from '../../assets/images/DSC_9569-1440p50-blurred.jpg';
import p2160 from '../../assets/images/DSC_9569-2160p35-blurred.jpg';

const Cover = () => {
  const [{ st, xy }, setSpring] = useSpring(() => ({
    st: 0,
    xy: [0, 0],
    config: { mass: 1, tension: 1000, friction: 50 },
  }));

  const handleMouseMove = useCallback(
    ({ clientX, clientY }) =>
      setSpring({
        xy: [clientX - window.innerWidth / 2, clientY - window.innerHeight / 2],
      }),
    [setSpring],
  );

  const onScroll = useCallback(() => setSpring({ st: window.scrollY / 4 }), [
    setSpring,
  ]);

  useEffect(() => {
    const event = 'scroll';
    window.addEventListener(event, onScroll);

    return () => {
      window.removeEventListener(event, onScroll);
    };
  });

  // @ts-ignore
  const interpolateBackground = interpolate([st, xy], (o, xy) => {
    // @ts-ignore
    return `translate3d(${-xy[0] / 15}px, ${-xy[1] / 15 -
      o}px, 0px) scale3d(1.4,1.4,1.4)`;
  });

  const handleScrollDown = () =>
    window.scrollTo({ top: window.innerHeight + 1 });

  return (
    <div className={styles.Cover} onMouseMove={handleMouseMove}>
      <animated.div
        style={{ transform: (interpolateBackground as unknown) as string }}
        className={styles.Background}
      >
        <picture>
          <source media="(min-width: 1440px)" srcSet={p1440} />
          <source media="(min-width: 2160px)" srcSet={p2160} />
          <img src={p1080} alt="me" />
        </picture>
        <div className={styles.LightenFilter} />
      </animated.div>

      <div className={styles.CoverContent}>
        <div className={styles.Text}>
          <h1>Calvin</h1>
          <h1>Hu</h1>
        </div>
        <div className={styles.Icon}>
          <Button circle clear click={handleScrollDown} ariaLabel="Scroll Down">
            <Fa lg>fas fa-angle-down</Fa>
          </Button>
        </div>
        <div className={styles.version}>{packageJson.version}</div>
      </div>
    </div>
  );
};

export default Cover;
