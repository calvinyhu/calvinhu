import React, { PureComponent } from 'react';
import Reveal from 'react-reveal/Reveal';
import Fade from 'react-reveal/Fade';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import styles from './About.module.scss';
import { storage } from '../../utils/firebase';

const profile = 'profile';
const files = [
  'DSC_1858-1080p35.jpg',
  'DSC_1858-1440p35.jpg',
  'DSC_1858-2160p35.jpg'
];
let staticUrls = null;

class About extends PureComponent {
  state = {
    isLoaded: false,
    urls: staticUrls
  };

  componentDidMount() {
    this.props.scrollIntoView();
    if (!this.state.urls) this.getUrls();
  }

  handleLoad = () => this.setState({ isLoaded: true });

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
          this.setState({ urls });
        });
    });
  };

  render() {
    const who = (
      <div className={styles.Question}>
        <h5>Calvin Who?</h5>
        <h6>Calvin Hu! (punny)</h6>
        <p>
          I am a UC Davis alumnus and graduated with a B.S. in Computer Science
          and a minor in Technology Management. My experience includes
          developing C++ and C applications, which simulate vehicle traffic, to
          test onboard networking hardware in various traffic scenarios. I am a
          generalist software engineer, actively pursuing a career in web
          development and seeking a full-stack engineering position in the Bay
          Area.
        </p>
      </div>
    );

    const obj = (
      <div className={styles.Question}>
        <h5>How am I pursuing my career objectives?</h5>
        <p>
          Within the past 3 months (July 2018 - Sep 2018), I taught myself
          JavaScript, HTML, CSS, React, and more tools and methodologies, to
          build my website and other projects. I have utilized web development
          tutorials on Udemy, developer documentation on React, Firebase, MDN,
          Stack Overflow, and Google Cloud Services. I have much more to learn
          and I am eager to improve my skills in full-stack development.
        </p>
      </div>
    );

    const consider = (
      <div className={styles.Question}>
        <h5>Why consider me? (Recruiters)</h5>
        <p>
          I have unrelenting determination to achieve milestones utilizing the
          best and most thoughtful methods. I am extremely organized, but also
          very adaptable. I love challenging myself and I love learning. I have
          the right skills and mindset to achieve my goals once I lay my eyes on
          them.
        </p>
      </div>
    );

    const passions = (
      <div className={styles.Passions}>
        <h5>What are my other passions?</h5>
        <p>
          I like to hike and capture photos of nature, people, and cars. Take a
          look at my <Link to="/photo">photography</Link>! I am also a
          calisthenics (bodyweight training) aficionado.
        </p>
      </div>
    );

    const contact = (
      <div className={styles.Contact}>
        <h5>Contact me @</h5>
        <h5>ycalvinhu@gmail.com</h5>
      </div>
    );

    const loaderClasses = classnames({
      [styles.Loader]: true,
      [styles.DisplayNone]: this.state.isLoaded
    });

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

    return (
      <Fade>
        <div className={styles.About}>
          <div className={styles.LoaderContainer}>
            <div className={loaderClasses} />
          </div>
          <div className={styles.Me}>{me}</div>
          <div className={styles.Questions}>
            <div className={styles.ColorSplash} />
            <main>
              <div className={styles.ColorSplash} />
              <Reveal effect={styles.BlockSlideFadeIn}>
                {who}
                {obj}
                {consider}
                {passions}
                {contact}
              </Reveal>
            </main>
          </div>
        </div>
      </Fade>
    );
  }
}

About.propTypes = {
  scrollIntoView: PropTypes.func.isRequired
};

export default About;
