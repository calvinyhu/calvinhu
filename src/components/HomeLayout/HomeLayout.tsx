import React, { FC, useState } from 'react';
import { Link, RouterProps, WindowLocation } from '@reach/router';
import clsx from 'clsx';

import styles from './HomeLayout.module.scss';
import { useScrollPositionFlag } from 'utils/hooks';
import Fa from 'components/UI/Fa/Fa';
import Button from 'components/UI/Button/Button';
import NavDrawer from '../NavDrawer/NavDrawer';

interface LinksProps {
  onClick?: () => void;
}

const Links: FC<LinksProps> = ({ onClick }) => (
  <>
    <Link to="photo" className={styles.NavBarLink} onClick={onClick}>
      Photography
    </Link>
    <Link to="about" className={styles.NavBarLink} onClick={onClick}>
      About
    </Link>
  </>
);

interface NavBarProps {
  isShowToTop: boolean;
  pathname: string;
  handleDrawerOpen: () => void;
}

const NavBar: FC<NavBarProps> = ({
  isShowToTop,
  pathname,
  handleDrawerOpen,
}) => {
  return (
    <div
      className={clsx(styles.NavBar, {
        [styles.White]: isShowToTop || pathname !== '/',
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
        <span className={styles.NavBarLinks}>
          <Links />
        </span>
        <span className={styles.NavBarDrawerToggle}>
          <Button circle clear click={handleDrawerOpen} ariaLabel="Menu">
            <Fa>fas fa-stream</Fa>
          </Button>
        </span>
      </span>
    </div>
  );
};

interface TopOfPageButtonProps {
  isShowToTop: boolean;
  handleScrollToTop: () => void;
}

const TopOfPageButton: FC<TopOfPageButtonProps> = ({
  isShowToTop,
  handleScrollToTop,
}) => {
  return (
    <div
      className={clsx(styles.BackToTopBtn, {
        [styles.OnScreenY]: isShowToTop,
      })}
    >
      <Button circle blueGray ariaLabel="Go To Top" click={handleScrollToTop}>
        <Fa white>fas fa-arrow-up</Fa>
      </Button>
    </div>
  );
};

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

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [percent, setPercent] = useState(0);
  const handleDrawerOpen = () => {
    setIsDrawerOpen(true);
    setPercent(1);
  };
  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
    setPercent(0);
  };

  return (
    <>
      <NavBar
        pathname={pathname}
        handleDrawerOpen={handleDrawerOpen}
        isShowToTop={isShowToTop}
      />
      <div className={styles.ContentContainer}>{children}</div>
      <NavDrawer
        handleDrawerClose={handleDrawerClose}
        isDrawerOpen={isDrawerOpen}
        navLinks={<Links onClick={handleDrawerClose} />}
        percent={percent}
      />
      <TopOfPageButton
        isShowToTop={isShowToTop}
        handleScrollToTop={handleScrollToTop}
      />
    </>
  );
};

export default HomeLayout;
