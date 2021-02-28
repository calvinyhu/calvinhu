import { FC, useState } from 'react';
import { Link, WindowLocation, RouterProps, Redirect, Router } from '@reach/router';
import NavBar from 'components/NavBar/NavBar';
import NavDrawer from 'components/NavDrawer/NavDrawer';
import TopOfPageButton from 'components/UI/Button/TopOfPageButton/TopOfPageButton';
import { useScrollPositionFlag } from 'utils/hooks';

import styles from './PhotoLayout.module.scss';
import Photography from 'components/Photography/Photography';

interface LinksProps {
  onClick?: () => void;
}

const Links: FC<LinksProps> = ({ onClick }) => (
  <>
    <Link to="travel" className={styles.NavBarLink} onClick={onClick}>
      Travel
    </Link>
    <Link to="automotive" className={styles.NavBarLink} onClick={onClick}>
      Automotive
    </Link>
    <Link to="portraits" className={styles.NavBarLink} onClick={onClick}>
      Portraits
    </Link>
  </>
);

interface PhotoLayoutProps extends RouterProps {
  path: string;
}

const PhotoLayout: FC<PhotoLayoutProps> = ({ location }) => {
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
        className={styles.NavBar}
        pathname={pathname}
        handleDrawerOpen={handleDrawerOpen}
        isShowToTop={isShowToTop}
        links={<Links />}
      />
      <Router>
        <Photography path="travel" />
        <Photography path="automotive" />
        <Photography path="portraits" />
        <Redirect from="/" to="travel" />
      </Router>
      <NavDrawer
        handleDrawerClose={handleDrawerClose}
        isDrawerOpen={isDrawerOpen}
        navLinks={<Links onClick={handleDrawerClose} />}
      />
      <TopOfPageButton isVisible={isShowToTop} handleScrollToTop={handleScrollToTop} />
    </>
  );
};

export default PhotoLayout;
