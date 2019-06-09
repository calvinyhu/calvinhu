import React from 'react';

import styles from './SuspenseFallback.module.scss';

const suspenseFallback = () => (
  <div className={styles.SuspenseFallback}>
    <div className={styles.LoaderContainer}>
      <div className={styles.Loader} />
    </div>
  </div>
);

export default suspenseFallback;
