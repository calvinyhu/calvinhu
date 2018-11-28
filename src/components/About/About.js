import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import styles from './About.module.scss';
import AboutMe from '../AboutMe/AboutMe';
import Priorities from '../Priorities/Priorities';
import Skills from '../Skills/Skills';
import Passions from '../Passions/Passions';
import Fa from '../UI/Icon/Fa/Fa';
import Carousel from '../Carousel/Carousel';
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
    let slideShow = null;
    if (this.state.urls) {
      // slideShow = (
      //   <picture>
      //     <source
      //       media="(min-width: 1440px)"
      //       srcSet={`${this.state.urls[files[1]]} 2x`}
      //     />
      //     <source
      //       media="(min-width: 2160px)"
      //       srcSet={`${this.state.urls[files[2]]} 2x`}
      //     />
      //     <img
      //       className={imgClasses}
      //       onLoad={this.handleLoad}
      //       src={this.state.urls[files[0]]}
      //       alt="me"
      //     />
      //   </picture>
      // );
      slideShow = <Carousel />;
    }

    let scrollIndicator = (
      <div className={styles.ScrollIndicator}>
        <Fa twoX white>
          fas fa-angle-double-down
        </Fa>
      </div>
    );

    const skills = (
      <div className={styles.SkillsContainer}>
        <Priorities />
        <Skills />
      </div>
    );

    return (
      <div className={styles.About}>
        <div className={styles.SlideShowContainer}>
          {loader}
          {slideShow}
          {scrollIndicator}
        </div>
        <div className={styles.FeaturesContainer}>
          <AboutMe handleCopyEmail={this.handleCopyEmail} />
          {skills}
          <Passions />
        </div>
      </div>
    );
  }
}

export default About;
