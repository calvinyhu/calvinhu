import React, { FC, useState } from 'react';
import { Link, RouterProps, WindowLocation } from '@reach/router';

import { useScrollPositionFlag } from 'utils/hooks';
import TopOfPageButton from 'components/UI/Button/TopOfPageButton/TopOfPageButton';
import NavDrawer from '../NavDrawer/NavDrawer';
import NavBar from 'components/NavBar/NavBar';

import styles from './HomeLayout.module.scss';

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
  const handleDrawerOpen = () => setIsDrawerOpen(true);
  const handleDrawerClose = () => setIsDrawerOpen(false);

  return (
    <>
      <NavBar
        pathname={pathname}
        handleDrawerOpen={handleDrawerOpen}
        isShowToTop={isShowToTop}
        links={<Links />}
      />
      <div className={styles.ContentContainer}>{children}</div>
      <NavDrawer
        handleDrawerClose={handleDrawerClose}
        isDrawerOpen={isDrawerOpen}
        navLinks={<Links onClick={handleDrawerClose} />}
      />
      <TopOfPageButton
        isVisible={isShowToTop}
        handleScrollToTop={handleScrollToTop}
      />
    </>
  );
};

export default HomeLayout;
