import React from 'react';
import classnames from 'classnames';

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
  const faClasses = classnames(styles.Fa, children, {
    'fa-lg': lg,
    'fa-3x': threeX,
    'fa-2x': twoX,
    [styles.White]: white,
  });

  return <div className={faClasses} />;
};

export default Fa;
