import React from 'react';
import PropTypes from 'prop-types';

import Backdrop from '../UI/Backdrop/Backdrop';
import Drawer from '../UI/Drawer/Drawer';

import styles from './NavDrawer.module.scss';

const NavDrawer = ({ handleDrawerClose, isDrawerOpen, navLinks, percent }) => (
  <>
    <Drawer right isOpen={isDrawerOpen}>
      <div className={styles.NavDrawerInner}>
        <div className={styles.NavDrawerLinksContainer}>{navLinks}</div>
      </div>
    </Drawer>
    <Backdrop
      isOpen={isDrawerOpen}
      click={handleDrawerClose}
      percent={percent}
    />
  </>
);

NavDrawer.propTypes = {
  handleDrawerClose: PropTypes.func.isRequired,
  isDrawerOpen: PropTypes.bool.isRequired,
  navLinks: PropTypes.any.isRequired,
  percent: PropTypes.number.isRequired,
};

export default NavDrawer;
