import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Button from '../UI/Button/Button';
import NavItem from '../UI/Button/NavItem/NavItem';
import Fa from '../UI/Fa/Fa';

import styles from './NavBar.module.scss';

const NavBar = props => {
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
    [styles.White]:
      (!props.isBackToTopButtonClicked && props.isShowBackToTopButton) ||
      props.pathname !== '/',
  });

  const nameClasses = classnames({
    [styles.Name]: true,
    [styles.Clickable]:
      (!props.isBackToTopButtonClicked && props.isShowBackToTopButton) ||
      props.pathname !== '/',
  });

  const style = {
    display: width < 640 ? 'none' : 'flex',
  };

  return (
    <div className={navClasses}>
      <div className={nameClasses}>
        <NavItem to="/" clear noActiveClass click={props.handleDrawerClose}>
          Calvin Hu
        </NavItem>
      </div>
      <div className={styles.NavLinksContainer}>
        <div style={style} className={styles.NavLinks}>
          {props.navLinks}
        </div>
        <div className={styles.DrawerToggle}>
          <Button circle clear click={props.handleDrawerOpen} name="menu">
            <Fa>fas fa-stream</Fa>
          </Button>
        </div>
      </div>
    </div>
  );
};

NavBar.propTypes = {
  isShowBackToTopButton: PropTypes.bool.isRequired,
  handleDrawerClose: PropTypes.func.isRequired,
  handleDrawerOpen: PropTypes.func.isRequired,
  navLinks: PropTypes.any.isRequired,
  pathname: PropTypes.string.isRequired,
};

export default NavBar;
