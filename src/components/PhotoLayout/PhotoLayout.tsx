import { FC, ReactNode, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import NavBar from 'components/NavBar/NavBar';
import NavDrawer from 'components/NavDrawer/NavDrawer';
import TopOfPageButton from 'components/UI/Button/TopOfPageButton/TopOfPageButton';
import { useScrollPositionFlag } from 'utils/hooks';

import styles from './PhotoLayout.module.scss';

interface LinksProps {
  onClick?: () => void;
}

const Links: FC<LinksProps> = ({ onClick }) => (
  <>
    <Link href="/photo/travel">
      <button className={styles.NavBarLink} onClick={onClick}>
        Travel
      </button>
    </Link>
    <Link href="/photo/automotive">
      <button className={styles.NavBarLink} onClick={onClick}>
        Automotive
      </button>
    </Link>
    <Link href="/photo/portraits">
      <button className={styles.NavBarLink} onClick={onClick}>
        Portraits
      </button>
    </Link>
  </>
);

interface PhotoLayoutProps {
  children: ReactNode;
}

const PhotoLayout = ({ children }: PhotoLayoutProps) => {
  const { pathname } = useRouter();

  const [isShowToTop, setIsShowToTop] = useState(false);
  useScrollPositionFlag(isShowToTop, setIsShowToTop, typeof window !== 'undefined' ? window.innerHeight : 0);
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
      {children}
      {/* <Router>
        <Photography path="travel" />
        <Photography path="automotive" />
        <Photography path="portraits" />
        <Redirect from="/" to="travel" />
      </Router> */}
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
