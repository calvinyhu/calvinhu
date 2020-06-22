import React, { FC } from 'react';
import { Link } from '@reach/router';
import clsx from 'clsx';

import Fa from 'components/UI/Fa/Fa';
import Button from 'components/UI/Button/Button';

import homeLayoutStyles from '../HomeLayout/HomeLayout.module.scss';
import styles from './NavBar.module.scss';

interface NavBarProps {
  className?: string;
  isShowToTop: boolean;
  pathname: string;
  handleDrawerOpen: () => void;
  links: React.ReactNode;
}

const NavBar: FC<NavBarProps> = ({
  className,
  isShowToTop,
  pathname,
  handleDrawerOpen,
  links,
}) => {
  return (
    <div
      className={clsx(styles.NavBar, className, {
        [styles.White]: isShowToTop || pathname !== '/',
      })}
    >
      <Link
        to="/"
        className={clsx(homeLayoutStyles.NavBarLink, styles.NavBarHomeLink, {
          [styles.Clickable]: isShowToTop || pathname !== '/',
        })}
      >
        Calvin Hu
      </Link>
      <span className={styles.NavBarRight}>
        <span className={styles.NavBarLinks}>{links}</span>
        <span className={styles.NavBarDrawerToggle}>
          <Button circle clear click={handleDrawerOpen} ariaLabel="menu">
            <Fa>fas fa-stream</Fa>
          </Button>
        </span>
      </span>
    </div>
  );
};

export default NavBar;
