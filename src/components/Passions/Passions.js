import React from 'react';
import { Link } from 'react-router-dom';
import Fade from 'react-reveal/Fade';

import styles from './Passions.module.scss';
import Fa from '../UI/Icon/Fa/Fa';

const passions = () => {
  return (
    <div className={styles.PassionsContainer}>
      <div className={styles.Passions}>
        <Fade up>
          <div className={styles.Passion}>
            <Fa threeX white>
              fas fa-code
            </Fa>
            <h5>Web Development</h5>
            <p>
              I taught myself front end and back end technologies, like React,
              Express, MongoDB, and many others, to build my website and other
              projects.
            </p>
          </div>
          <div className={styles.Passion}>
            <Fa threeX white>
              fas fa-camera-retro
            </Fa>
            <h5>Photography</h5>
            <p>
              I have been shooting since 2013! I like taking photos of nature,
              cars, and people. Capturing photos helps boost my creative flow.
              Check out my <Link to="/photo">photography</Link>!
            </p>
          </div>
          <div className={styles.Passion}>
            <Fa threeX white>
              fas fa-dumbbell
            </Fa>
            <h5>Calisthenics</h5>
            <p>
              I am enthusiastic about keeping a healthy mind and body. I do
              bodyweight and weight lifting exercises frequently.
            </p>
          </div>
        </Fade>
      </div>
    </div>
  );
};

export default passions;
