import React from 'react';
import classnames from 'classnames';

import styles from './Backdrop.module.scss';

interface BackdropProps {
  click: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  isOpen: boolean;
  percent?: number;
}

const Backdrop = ({ click, isOpen, percent }: BackdropProps) => {
  const backdropClasses = classnames({
    [styles.Backdrop]: true,
    [styles.OpenBackdrop]: isOpen,
    [styles.CloseBackdrop]: !isOpen,
  });

  let style = null;
  if (percent) {
    style = { opacity: percent, zIndex: 2, transition: 'none' };

    if (percent === 0) {
      style.opacity = 0;
      style.zIndex = -1;
      style.transition =
        'opacity 0.5s cubic-bezier(0.26, 0.94, 0.58, 1), z-index 0s 0.5s cubic-bezier(0.26, 0.94, 0.58, 1)';
    }
    if (percent === 1) {
      style.opacity = 1;
      style.zIndex = 2;
      style.transition = 'opacity 0.5s cubic-bezier(0.26, 0.94, 0.58, 1)';
    }
  }

  return (
    <div
      style={style ? style : {}}
      className={backdropClasses}
      onClick={click}
    />
  );
};

export default Backdrop;
