import React from 'react';
import Fade from 'react-reveal/Fade';

import styles from './About.module.scss';
import profilePicture from '../../assets/images/profilePicture.jpg';
import Fa from '../../components/UI/Fa/Fa';

const About = () => (
  <div className={styles.About}>
    <Fade>
      <div className={styles.ProfilePictureContainer}>
        <img src={profilePicture} alt="Calvin Hu" />
      </div>
      <div className={styles.Description}>
        <div className={styles.PunchLine}>
          <h4>Calvin Who?</h4>
          <h4>Calvin Hu!</h4>
        </div>
        I graduated from UC Davis with a B.S. in Computer Science and a minor in
        Technology Management. I'm pursuing a career in web app development and
        when I'm not at my computer, I am outside shooting photos or at the gym
        keeping fit.
      </div>
      <div className={styles.SocialMedia}>
        <a
          href="https://www.linkedin.com/in/calvinyhu"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Fa twoX>fab fa-linkedin</Fa>
        </a>
        <a
          href="https://www.github.com/calvinyhu"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Fa twoX>fab fa-github</Fa>
        </a>
        <a
          href="https://www.facebook.com/calvinyhu"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Fa twoX>fab fa-facebook-f</Fa>
        </a>
        <a
          href="https://www.instagram.com/calvinyhu"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Fa twoX>fab fa-instagram</Fa>
        </a>
      </div>
    </Fade>
  </div>
);

export default About;
