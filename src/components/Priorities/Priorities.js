import React from 'react';
import Slide from 'react-reveal/Slide';

import styles from './Priorities.module.scss';
import Fa from '../UI/Icon/Fa/Fa';

const Priorities = () => {
  return (
    <div className={styles.Priorities}>
      <Slide left>
        <div className={styles.Priority}>
          <Fa twoX>fas fa-columns</Fa>
          <h5>Clean</h5>
          <p>Simple and concise. Material Design.</p>
        </div>
        <div className={styles.Priority}>
          <div className={styles.ResponsiveIcons}>
            <Fa twoX>fas fa-mobile-alt</Fa>
            <Fa>fas fa-plus</Fa>
            <Fa twoX>fas fa-laptop</Fa>
          </div>
          <h5>Responsive</h5>
          <p>Mobile first with fluid layouts.</p>
        </div>
        <div className={styles.Priority}>
          <Fa twoX>fas fa-bolt</Fa>
          <h5>Fast</h5>
          <p>Lag-free user experience.</p>
        </div>
      </Slide>
    </div>
  );
};

export default Priorities;
