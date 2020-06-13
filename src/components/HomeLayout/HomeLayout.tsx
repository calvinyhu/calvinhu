import React, { FC, useState } from 'react';
import { Link, RouterProps, WindowLocation } from '@reach/router';
import clsx from 'clsx';

import styles from './HomeLayout.module.scss';
import { useScrollPositionFlag } from 'utils/hooks';
import Fa from 'components/UI/Fa/Fa';
import Button from 'components/UI/Button/Button';

interface HomeLayoutProps extends RouterProps {
  path: string;
}

const HomeLayout: FC<HomeLayoutProps> = ({ children, location }) => {
  const { pathname } = location as WindowLocation;

  const [isShowToTop, setIsShowToTop] = useState(false);
  useScrollPositionFlag(isShowToTop, setIsShowToTop, window.innerHeight);
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0 });
    setIsShowToTop(false);
  };

  return (
    <>
      <div
        className={clsx(styles.NavBar, {
          [styles.White]: isShowToTop,
        })}
      >
        <Link
          to="."
          className={clsx(styles.NavBarLink, styles.NavBarHomeLink, {
            [styles.Clickable]: isShowToTop || pathname !== '/',
          })}
        >
          Calvin Hu
        </Link>
        <span className={styles.NavBarRight}>
          <Link to="photo" className={styles.NavBarLink}>
            Photography
          </Link>
          <Link to="about" className={styles.NavBarLink}>
            About
          </Link>
        </span>
      </div>
      {children}
      <div
        className={clsx(styles.BackToTopBtn, {
          [styles.OnScreenY]: isShowToTop,
        })}
      >
        <Button circle blueGray ariaLabel="Go To Top" click={handleScrollToTop}>
          <Fa white>fas fa-arrow-up</Fa>
        </Button>
      </div>
    </>
  );
};

export default HomeLayout;
