import React, { FC } from 'react';
import { useSpring, animated } from 'react-spring';

import styles from './About.module.scss';
import profilePicture from 'assets/images/profilePicture.jpg';
import Fa from 'components/UI/Fa/Fa';
import HL from 'components/UI/HyperLink/HyperLink';

const aboutParagraph =
  "I graduated from UC Davis with a B.S. in Computer Science and a minor in Technology Management. I'm pursuing a career in web app development and when I'm not at my computer, I am outside shooting photos or at the gym keeping fit.";

const SOCIAL_MEDIA = ['linkedin', 'github', 'facebook', 'instagram'];

interface AboutProps {
  path: string;
}

const About: FC<AboutProps> = () => {
  const spring = useSpring({ opacity: 1, from: { opacity: 0 } });

  return (
    <animated.div style={spring} className={styles.About}>
      <div className={styles.ProfilePictureContainer}>
        <img src={profilePicture} alt="Calvin Hu" />
      </div>
      <div className={styles.Description}>
        <div className={styles.PunchLine}>
          <h4>Calvin Who?</h4>
          <h4>Calvin Hu!</h4>
        </div>
        <p>{aboutParagraph}</p>
      </div>
      <div className={styles.SocialMedia}>
        {SOCIAL_MEDIA.map(media => (
          <HL
            key={media}
            href={`https://www.${media}.com${
              media === 'linkedin' ? '/in' : ''
            }/calvinyhu`}
          >
            <Fa twoX>{`fab fa-${media}`}</Fa>
          </HL>
        ))}
      </div>
    </animated.div>
  );
};

export default About;
