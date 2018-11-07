import React, { PureComponent } from 'react';
import Fade from 'react-reveal/Fade';
import Zoom from 'react-reveal/Zoom';
import Reveal from 'react-reveal/Reveal';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import styles from './About.module.scss';
import Button from '../UI/Button/Button';
import Input from '../UI/Input/Input';
import Fa from '../UI/Icon/Fa/Fa';
import { storage } from '../../utils/firebase';
import profile_picture from '../../assets/images/profile.jpg';

const profile = 'profile';
const files = [
  'DSC_1858-1080p35.jpg',
  'DSC_1858-1440p35.jpg',
  'DSC_1858-2160p35.jpg',
  'DSC_6523-1080p35.jpg'
];
let staticUrls = null;

class About extends PureComponent {
  static propTypes = {
    isClicked: PropTypes.bool,
    scrollIntoView: PropTypes.func.isRequired
  };

  isAlive = false;

  state = {
    isLoaded: false,
    urls: staticUrls
  };

  componentDidMount() {
    this.isAlive = true;
    if (!this.state.urls) this.getUrls();
    if (this.props.isClicked) this.props.scrollIntoView();
  }

  componentWillUnmount() {
    this.isAlive = false;
  }

  handleLoad = () => {
    if (this.isAlive) this.setState({ isLoaded: true });
  };

  handleCopyEmail = () => {
    document.getElementById('email').select();
    document.execCommand('copy');
    if (window.getSelection) window.getSelection().removeAllRanges();
  };

  getUrls = () => {
    staticUrls = {};

    files.forEach(file => {
      storage
        .ref(`${profile}/${file}`)
        .getDownloadURL()
        .then(url => {
          staticUrls[file] = url;
          const urls = { ...this.state.urls };
          urls[file] = url;

          if (this.isAlive) this.setState({ urls });
        });
    });
  };

  render() {
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
          <Button clear circle sm click={this.handleCopyEmail}>
            <Fa lg white>
              far fa-copy
            </Fa>
          </Button>
        </div>
      </div>
    );

    const aboutMe = (
      <div className={styles.AboutMeContainer}>
        <div className={styles.AboutMe}>
          <Reveal effect={styles.BlockSlideFadeIn}>
            <div className={styles.Intro}>
              <Fa threeX white>
                far fa-smile
              </Fa>
              <h5>Calvin Who? Calvin Hu!</h5>
              <p>
                I graduated from UC Davis with a B.S. in Computer Science and a
                minor in Technology Management. I am actively pursuing a career
                in web application development and am seeking a full stack
                engineering position, with more emphasis on front end.
              </p>
            </div>
          </Reveal>
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
      </div>
    );

    const DELAY = 500;
    const skills = (
      <div className={styles.SkillsContainer}>
        <Fade>
          <div className={styles.Skills}>
            <div className={styles.Skill}>
              <p>C</p>
              <div className={styles.Bar}>
                <Reveal effect={styles.Extend} delay={DELAY}>
                  <div className={styles.C} />
                </Reveal>
              </div>
            </div>
            <div className={styles.Skill}>
              <p>C++</p>
              <div className={styles.Bar}>
                <Reveal effect={styles.Extend} delay={DELAY}>
                  <div className={styles.CPP} />
                </Reveal>
              </div>
            </div>
            <div className={styles.Skill}>
              <p>Express</p>
              <div className={styles.Bar}>
                <Reveal effect={styles.Extend} delay={DELAY}>
                  <div className={styles.Express} />
                </Reveal>
              </div>
            </div>
            <div className={styles.Skill}>
              <p>Git</p>
              <div className={styles.Bar}>
                <Reveal effect={styles.Extend} delay={DELAY}>
                  <div className={styles.Git} />
                </Reveal>
              </div>
            </div>
            <div className={styles.Skill}>
              <p>gulp</p>
              <div className={styles.Bar}>
                <Reveal effect={styles.Extend} delay={DELAY}>
                  <div className={styles.Gulp} />
                </Reveal>
              </div>
            </div>
            <div className={styles.Skill}>
              <p>HTML</p>
              <div className={styles.Bar}>
                <Reveal effect={styles.Extend} delay={DELAY}>
                  <div className={styles.HTML} />
                </Reveal>
              </div>
            </div>
            <div className={styles.Skill}>
              <p>JavaScript</p>
              <div className={styles.Bar}>
                <Reveal effect={styles.Extend} delay={DELAY}>
                  <div className={styles.JavaScript} />
                </Reveal>
              </div>
            </div>
            <div className={styles.Skill}>
              <p>mlab</p>
              <div className={styles.Bar}>
                <Reveal effect={styles.Extend} delay={DELAY}>
                  <div className={styles.Mlab} />
                </Reveal>
              </div>
            </div>
            <div className={styles.Skill}>
              <p>Node.js</p>
              <div className={styles.Bar}>
                <Reveal effect={styles.Extend} delay={DELAY}>
                  <div className={styles.Node} />
                </Reveal>
              </div>
            </div>
            <div className={styles.Skill}>
              <p>Postman</p>
              <div className={styles.Bar}>
                <Reveal effect={styles.Extend} delay={DELAY}>
                  <div className={styles.Postman} />
                </Reveal>
              </div>
            </div>
            <div className={styles.Skill}>
              <p>React</p>
              <div className={styles.Bar}>
                <Reveal effect={styles.Extend} delay={DELAY}>
                  <div className={styles.React} />
                </Reveal>
              </div>
            </div>
            <div className={styles.Skill}>
              <p>SASSY CSS</p>
              <div className={styles.Bar}>
                <Reveal effect={styles.Extend} delay={DELAY}>
                  <div className={styles.SASSYCSS} />
                </Reveal>
              </div>
            </div>
            <div className={styles.Skill}>
              <p>VS Code</p>
              <div className={styles.Bar}>
                <Reveal effect={styles.Extend} delay={DELAY}>
                  <div className={styles.VSCode} />
                </Reveal>
              </div>
            </div>
          </div>
        </Fade>
      </div>
    );

    const passions = (
      <div className={styles.PassionsContainer}>
        <div className={styles.Passions}>
          <Fade left>
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
          </Fade>
          <Fade up>
            <div className={styles.Passion}>
              <Fa threeX white>
                fas fa-camera-retro
              </Fa>
              <h5>Photography</h5>
              <p>
                I like taking photos! I have been shooting since 2013. I like to
                take photos of nature, cars, and people. Capturing photos helps
                me be more creative. Check out my{' '}
                <Link to="/photo">photography</Link>!
              </p>
            </div>
          </Fade>
          <Fade right>
            <div className={styles.Passion}>
              <Fa threeX white>
                fas fa-dumbbell
              </Fa>
              <h5>Calisthenics</h5>
              <p>
                I also do bodyweight and weight training. I am enthusiastic
                about keeping a healthy mind and body.
              </p>
            </div>
          </Fade>
        </div>
      </div>
    );

    let loader = null;
    if (!this.state.isLoaded) {
      loader = (
        <div className={styles.LoaderContainer}>
          <div className={styles.Loader} />
        </div>
      );
    }

    const imgClasses = classnames({
      [styles.Hide]: true,
      [styles.FadeIn]: this.state.isLoaded
    });

    let me = null;
    if (this.state.urls) {
      me = (
        <picture>
          <source
            media="(min-width: 1440px)"
            srcSet={`${this.state.urls[files[1]]} 2x`}
          />
          <source
            media="(min-width: 2160px)"
            srcSet={`${this.state.urls[files[2]]} 2x`}
          />
          <img
            className={imgClasses}
            onLoad={this.handleLoad}
            src={this.state.urls[files[0]]}
            alt="me"
          />
        </picture>
      );
    }

    let scrollIndicator = (
      <div className={styles.ScrollIndicator}>
        <Fa twoX white>
          fas fa-angle-double-down
        </Fa>
      </div>
    );

    return (
      <div className={styles.About}>
        <div className={styles.SlideShowContainer}>
          {loader}
          {me}
          {scrollIndicator}
        </div>
        <div className={styles.FeaturesContainer}>
          {aboutMe}
          {skills}
          {passions}
        </div>
      </div>
    );
  }
}

export default About;
