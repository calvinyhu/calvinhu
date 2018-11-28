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
              I taught myself JavaScript, HTML, CSS, React, and more tools and
              methodologies, to build my website and other projects.
            </p>
          </div>
          <div className={styles.Passion}>
            <Fa threeX white>
              fas fa-camera-retro
            </Fa>
            <h5>Photography</h5>
            <p>
              I like taking photos! I have been shooting since 2013. I like to
              take photos of nature, cars, and people. Capturing photos helps me
              be more creative. Check out my{' '}
              <Link to="/photo">photography</Link>!
            </p>
          </div>
          <div className={styles.Passion}>
            <Fa threeX white>
              fas fa-dumbbell
            </Fa>
            <h5>Calisthenics</h5>
            <p>
              I also do bodyweight and weight training. I am enthusiastic about
              keeping a healthy mind and body.
            </p>
          </div>
        </Fade>
      </div>
    </div>
  );
};

export default passions;
