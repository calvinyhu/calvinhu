import React from 'react';
import Fade from 'react-reveal/Fade';
import Zoom from 'react-reveal/Zoom';

import styles from './AboutMe.module.scss';
import Button from '../UI/Button/Button';
import Input from '../UI/Input/Input';
import Fa from '../UI/Icon/Fa/Fa';
import profile_picture from '../../assets/images/profile.jpg';

const aboutMe = props => {
  const contactEmail = (
    <div className={styles.Handle}>
      <div className={styles.EmailContainer}>
        <Input
          noBorder
          noBoxShadow
          noError
          required={false}
          readOnly
          id="email"
          type="text"
          value="ycalvinhu@gmail.com"
          name="email"
        />
      </div>
      <div className={styles.Copy}>
        <Button clear circle sm click={props.handleCopyEmail}>
          <Fa lg white>
            far fa-copy
          </Fa>
        </Button>
      </div>
    </div>
  );

  return (
    <div className={styles.AboutMe}>
      <Fade up>
        <div className={styles.Intro}>
          <Fa threeX white>
            far fa-smile
          </Fa>
          <h5>Calvin Who? Calvin Hu!</h5>
          <p>
            I graduated from UC Davis with a B.S. in Computer Science and a
            minor in Technology Management. I am actively pursuing a career in
            web application development and am seeking a full stack engineering
            position, with more emphasis on front end.
          </p>
        </div>
      </Fade>
      <div className={styles.Profile}>
        <Zoom>
          <div className={styles.PictureContainer}>
            <img src={profile_picture} alt="profile" />
          </div>
        </Zoom>
        <Fade>
          <div className={styles.SocialMedia}>
            <a
              href="https://www.linkedin.com/in/calvinyhu"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Fa twoX white>
                fab fa-linkedin
              </Fa>
            </a>
            <a
              href="https://www.github.com/calvinyhu"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Fa twoX white>
                fab fa-github
              </Fa>
            </a>
            <a
              href="https://www.facebook.com/calvinyhu"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Fa twoX white>
                fab fa-facebook-f
              </Fa>
            </a>
            <a
              href="https://www.instagram.com/calvinyhu"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Fa twoX white>
                fab fa-instagram
              </Fa>
            </a>
          </div>
          {contactEmail}
        </Fade>
      </div>
    </div>
  );
};

export default aboutMe;
