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
      <div className={classes.Question}>
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
      <div className={classes.Question}>
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
      <div className={classes.Passions}>
        <h5>What are my other passions?</h5>
        <p>
          I like traveling and exploring nature and taking photos of it. Take a
          look at my <Link to="/photo">photography</Link>! I am also a
          calisthenics (bodyweight training) aficionado.
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
