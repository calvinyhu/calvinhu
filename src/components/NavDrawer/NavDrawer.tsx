import React from 'react';

import Backdrop from 'components/UI/Backdrop/Backdrop';
import Drawer from 'components/UI/Drawer/Drawer';
import { NavDrawerProps } from './NavDrawer.models';

import styles from './NavDrawer.module.scss';

const NavDrawer = ({
  handleDrawerClose,
  isDrawerOpen,
  navLinks,
  percent,
}: NavDrawerProps) => (
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

export default NavDrawer;
