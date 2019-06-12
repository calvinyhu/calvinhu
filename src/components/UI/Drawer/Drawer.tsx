import React from 'react';
import classnames from 'classnames';

import styles from './Drawer.module.scss';

interface DrawerProps {
  left: any;
  right: any;
  isOpen: any;
  children: any;
}

const Drawer = ({ left, right, isOpen, children }: DrawerProps) => {
  const drawerClasses = classnames({
    [styles.LeftDrawer]: left,
    [styles.OpenDrawer]: left && isOpen,
    [styles.CloseLeftDrawer]: left && !isOpen,

    [styles.RightDrawer]: right,
    [styles.OpenDrawer]: right && isOpen,
    [styles.CloseRightDrawer]: right && !isOpen,
  });

  return <div className={drawerClasses}>{children}</div>;
};

export default Drawer;
