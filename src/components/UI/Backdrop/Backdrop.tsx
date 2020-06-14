import React from 'react';
import clsx from 'clsx';

import styles from './Backdrop.module.scss';

interface BackdropProps {
  onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  isOpen: boolean;
}

const Backdrop = ({ onClick, isOpen }: BackdropProps) => {
  const backdropClasses = clsx({
    [styles.Backdrop]: true,
    [styles.OpenBackdrop]: isOpen,
    [styles.CloseBackdrop]: !isOpen,
  });

  let style = null;
  if (isOpen) {
    style = { opacity: Number(isOpen), zIndex: 2, transition: 'none' };

    if (!isOpen) {
      style.opacity = 0;
      style.zIndex = -1;
      style.transition =
        'opacity 0.5s cubic-bezier(0.26, 0.94, 0.58, 1), z-index 0s 0.5s cubic-bezier(0.26, 0.94, 0.58, 1)';
    }
    if (isOpen) {
      style.opacity = 1;
      style.zIndex = 2;
      style.transition = 'opacity 0.5s cubic-bezier(0.26, 0.94, 0.58, 1)';
    }
  }

  return (
    <div
      style={style ? style : {}}
      className={backdropClasses}
      onClick={onClick}
    />
  );
};

export default Backdrop;
