import React from 'react';
import clsx from 'clsx';

import styles from './Fa.module.scss';

interface FaProps {
  children: string;
  lg?: boolean;
  threeX?: boolean;
  twoX?: boolean;
  white?: boolean;
}

const Fa = ({
  children,
  lg = false,
  threeX = false,
  twoX = false,
  white = false,
}: FaProps) => {
  const faClasses = clsx(styles.Fa, children, {
    'fa-lg': lg,
    'fa-3x': threeX,
    'fa-2x': twoX,
    [styles.White]: white,
  });

  return <div className={faClasses} />;
};

export default Fa;
