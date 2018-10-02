import React, { PureComponent } from 'react';
import Reveal from 'react-reveal/Reveal';
import { Link } from 'react-router-dom';

import classes from './About.css';

class About extends PureComponent {
  componentDidMount() {
    this.props.scrollIntoView();
  }

  render() {
    const who = (
      <div className={classes.Question}>
        <h5>Calvin Who?</h5>
        <h6>Calvin Hu! (punny)</h6>
        <p>
          I am a recent UC Davis graduate, currently seeking a full-stack
          development position in the Bay Area. Previously, I have developed C++
          and C applications that simulate vehicle traffic to test onboard
          networking hardware in various traffic scenarios, including blind spot
          warning detection, forward collision warning, and automatic toll
          collection. I am a generalist software engineer, actively pursuing a
          career in full-stack engineering.
        </p>
      </div>
    );

    const obj = (
      <div className={classes.Question}>
        <h5>How am I pursuing my career objectives?</h5>
        <p>
          Within the past 3 months (July 2018 - Sep 2018), I taught myself
          JavaScript, HTML, CSS, React, and more tools and methodologies, to
          build my website and other projects. I have utilized web development
          tutorials on Udemy, developer documentation on React, Firebase, MDN,
          Stack Overflow, and Google Cloud Services. I have much more to learn
          and I am eager to improve my skills in both front-end and back-end
          development.
        </p>
      </div>
    );

    const consider = (
      <div className={classes.Question}>
        <h5>Why consider me? (Recruiters)</h5>
        <p>
          I have unrelenting determination to achieve milestones utilizing the
          best and thoughtful methods. I am extremely organized both virtually
          and physically, but also very adaptable. I love challenging myself and
          I love learning. I have the right skills and mindset to achieve my
          goals once I lay my eyes on them.
        </p>
      </div>
    );

    const passions = (
      <div className={classes.Passions}>
        <h5>What are my other passions?</h5>
        <p>
          Take a look at my <Link to="/photo">photography</Link> and how I stay{' '}
          <Link to="/fitness">healthy</Link>.
        </p>
      </div>
    );

    const contact = (
      <div className={classes.Contact}>
        <h5>Contact me at:</h5>
        <h5>ycalvinhu@gmail.com</h5>
      </div>
    );

    return (
      <Reveal effect={classes.BlockSlideFadeIn}>
        <div className={classes.About}>
          <div className={classes.Me} />
          <div className={classes.ColorSplash} />
          <main>
            <div className={classes.ColorSplash} />
            <Reveal effect={classes.BlockSlideFadeIn}>
              {who}
              {obj}
              {consider}
              {passions}
              {contact}
            </Reveal>
          </main>
        </div>
      </Reveal>
    );
  }
}

export default About;
