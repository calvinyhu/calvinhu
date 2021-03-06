import clsx from 'clsx';

import styles from './Drawer.module.scss';

interface DrawerProps {
  // eslint-disable-next-line
  children: any;
  isOpen: boolean;
  left?: boolean;
  right?: boolean;
}

const Drawer = ({ children, isOpen, left = false, right = false }: DrawerProps) => {
  const drawerClasses = clsx({
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
