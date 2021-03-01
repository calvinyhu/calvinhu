import { FC, useState, ReactNode } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { useScrollPositionFlag } from 'utils/hooks';
import TopOfPageButton from 'components/UI/Button/TopOfPageButton/TopOfPageButton';
import NavDrawer from '../NavDrawer/NavDrawer';
import NavBar from 'components/NavBar/NavBar';

import styles from './HomeLayout.module.scss';
// import Home from 'components/Home/Home';

// const About = lazy(() => import('components/About/About'));

interface LinksProps {
  onClick?: () => void;
}

const Links: FC<LinksProps> = ({ onClick }) => (
  <>
    <Link href="photo">
      <button className={styles.NavBarLink} onClick={onClick}>
        Photography
      </button>
    </Link>
    <Link href="about">
      <button className={styles.NavBarLink} onClick={onClick}>
        About
      </button>
    </Link>
  </>
);

interface HomeLayoutProps {
  children: ReactNode;
}

const HomeLayout = ({ children }: HomeLayoutProps) => {
  const { pathname } = useRouter();

  const [isShowToTop, setIsShowToTop] = useState(false);
  useScrollPositionFlag(isShowToTop, setIsShowToTop, typeof window !== 'undefined' ? window?.innerHeight : 0);
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0 });
    setIsShowToTop(false);
  };

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const handleDrawerOpen = () => setIsDrawerOpen(true);
  const handleDrawerClose = () => setIsDrawerOpen(false);

  return (
    <>
      <NavBar pathname={pathname} handleDrawerOpen={handleDrawerOpen} isShowToTop={isShowToTop} links={<Links />} />
      <div className={styles.ContentContainer}>
        {children}
        {/* <About path="about" /> */}
      </div>
      <NavDrawer
        handleDrawerClose={handleDrawerClose}
        isDrawerOpen={isDrawerOpen}
        navLinks={<Links onClick={handleDrawerClose} />}
      />
      <TopOfPageButton isVisible={isShowToTop} handleScrollToTop={handleScrollToTop} />
    </>
  );
};

export default HomeLayout;
