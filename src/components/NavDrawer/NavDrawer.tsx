import React from 'react';

import Backdrop from 'components/UI/Backdrop/Backdrop';
import Drawer from 'components/UI/Drawer/Drawer';

import styles from './NavDrawer.module.scss';

export interface NavDrawerProps {
  handleDrawerClose: () => void;
  isDrawerOpen: boolean;
  navLinks: React.ReactFragment;
}

const NavDrawer = ({
  handleDrawerClose,
  isDrawerOpen,
  navLinks,
}: NavDrawerProps) => (
  <>
    <Drawer right isOpen={isDrawerOpen}>
      <div className={styles.NavDrawerInner}>
        <div className={styles.NavDrawerLinksContainer}>{navLinks}</div>
      </div>
    </Drawer>
    <Backdrop isOpen={isDrawerOpen} onClick={handleDrawerClose} />
  </>
);

export default NavDrawer;
