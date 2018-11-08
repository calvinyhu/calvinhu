import React, { PureComponent } from 'react';
import Fade from 'react-reveal/Fade';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import styles from './About.module.scss';
import AboutMe from '../AboutMe/AboutMe';
import Skills from '../Skills/Skills';
import Passions from '../Passions/Passions';
import Fa from '../UI/Icon/Fa/Fa';
import { storage } from '../../utils/firebase';

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

    const aboutMe = (
      <div className={styles.AboutMeContainer}>
        <AboutMe handleCopyEmail={this.handleCopyEmail} />
      </div>
    );

    const skills = (
      <Fade>
        <div className={styles.SkillsContainer}>
          <Skills />
        </div>
      </Fade>
    );

    const passions = (
      <div className={styles.PassionsContainer}>
        <Passions />
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
