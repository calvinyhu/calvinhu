import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Button from '../UI/Button/Button';
import NavItem from '../UI/Button/NavItem/NavItem';
import Rf from '../UI/Icon/Rf/Rf';

import styles from './NavBar.module.scss';

const NavBar = props => {
  const navClasses = classnames({
    [styles.Nav]: true,
    [styles.White]: props.isShowBackToTopButton || props.pathname !== '/',
  });

  const nameClasses = classnames({
    [styles.Name]: true,
    [styles.Clickable]: props.isShowBackToTopButton || props.pathname !== '/',
  });

  return (
    <div className={navClasses}>
      <div className={nameClasses}>
        <NavItem to="/" clear noActiveClass click={props.handleDrawerClose}>
          Calvin Hu
        </NavItem>
      </div>
      <div className={styles.NavLinksContainer}>
        <div className={styles.NavLinks}>{props.navLinks}</div>
        <div className={styles.DrawerToggle}>
          <Button circle clear click={props.handleDrawerOpen}>
            <Rf sm>menu</Rf>
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
