import React from 'react';

import styles from './Container.module.scss';

const Container = props => {
  const { disabled = false, center = true, children } = props;

  if (disabled) return <>{children}</>;

  return <div className={center ? styles.center : ''}>{children}</div>;
};

export default Container;
