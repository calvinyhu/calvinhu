import React, { PureComponent } from 'react';
import Reveal from 'react-reveal/Reveal';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import styles from './About.module.scss';
import Button from '../UI/Button/Button';
import Input from '../UI/Input/Input';
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
    scrollIntoView: PropTypes.func.isRequired
  };

  state = {
    isLoaded: false,
    urls: staticUrls
  };

  componentDidMount() {
    this.props.scrollIntoView();
    if (!this.state.urls) this.getUrls();
  }

  handleLoad = () => this.setState({ isLoaded: true });

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
          I graduated from UC Davis with a B.S. in Computer Science and a minor
          in Technology Management. My experience includes developing C++ and C
          applications, which simulate vehicle traffic, to test onboard
          networking hardware in various traffic scenarios. I am actively
          pursuing a career in web application development and am seeking a full
          stack engineering position, with more emphasis on front end.
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
          best and most thoughtful methods. I am organized, but also adaptable.
          I love challenging myself and I love learning. I have the right skills
          and mindset to achieve goals once I lay my eyes on them.
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
        <h5>Contact Me:</h5>
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
              <Fa lg>far fa-copy</Fa>
            </Button>
          </div>
        </div>
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
    );
  }
}

export default About;
