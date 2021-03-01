import { useSpring, animated } from 'react-spring';
import Image from 'next/image';

import Fa from 'components/UI/Fa/Fa';
import HL from 'components/UI/HyperLink/HyperLink';

import styles from './About.module.scss';

const aboutParagraph =
  "I graduated from UC Davis with a B.S. in Computer Science and a minor in Technology Management. I'm pursuing a career in web app development and when I'm not at my computer, I am outside shooting photos or at the gym keeping fit.";

const SOCIAL_MEDIA = ['linkedin', 'github', 'facebook', 'instagram'];

const About = () => {
  const spring = useSpring({ opacity: 1, from: { opacity: 0 } });

  return (
    <animated.div style={spring} className={styles.About}>
      <div className={styles.ProfilePictureContainer}>
        <Image src="/assets/images/profilePicture.jpg" height="150" width="150" alt="Calvin Hu" />
      </div>
      <div className={styles.Description}>
        <p>{aboutParagraph}</p>
      </div>
      <div className={styles.SocialMedia}>
        {SOCIAL_MEDIA.map((media) => (
          <HL key={media} href={`https://www.${media}.com${media === 'linkedin' ? '/in' : ''}/calvinyhu`}>
            <Fa twoX>{`fab fa-${media}`}</Fa>
          </HL>
        ))}
      </div>
    </animated.div>
  );
};

export default About;
