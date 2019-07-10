import React, { useEffect, useState } from 'react';
import classnames from 'classnames';

import Button from '../UI/Button/Button';
import NavItem from '../UI/NavItem/NavItem';
import Fa from '../UI/Fa/Fa';
import { NavBarProps } from './NavBar.models';

import styles from './NavBar.module.scss';

const NavBar = ({
  handleDrawerClose,
  handleDrawerOpen,
  isShowToTop,
  navLinks,
  pathname,
}: NavBarProps) => {
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);

    const event = 'resize';
    window.addEventListener(event, handleResize);

    return () => {
      window.removeEventListener(event, handleResize);
    };
  }, [width]);

  const navClasses = classnames({
    [styles.Nav]: true,
    [styles.White]: isShowToTop || pathname !== '/',
  });

  const nameClasses = classnames({
    [styles.Name]: true,
    [styles.Clickable]: isShowToTop || pathname !== '/',
  });

  const style = {
    display: width < 640 ? 'none' : 'flex',
  };

  return (
    <div className={navClasses}>
      <div className={nameClasses}>
        {/*
        // @ts-ignore */}
        <NavItem to="/" clear noActiveClass click={handleDrawerClose}>
          Calvin Hu
        </NavItem>
      </div>
      <div className={styles.NavLinksContainer}>
        <div style={style} className={styles.NavLinks}>
          {navLinks}
        </div>
        <div className={styles.DrawerToggle}>
          <Button circle clear click={handleDrawerOpen} ariaLabel="Menu">
            <Fa>fas fa-stream</Fa>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
