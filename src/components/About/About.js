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
        <h4>Calvin Who?</h4>
        <h6>Calvin Hu! (punny)</h6>
        <p>
          I am a recent UC Davis graduate, currently seeking an entry-level web
          development position in the Bay Area. Previously, I have developed C++
          and C applications that simulate vehicle traffic to test hardware
          capabilities for various traffic scenarios, including blind spot
          warning detection, forward collision warning, and automatic toll
          collection. I am a generalist, actively pursuing a specialization in
          full-stack web development.
        </p>
      </div>
    );

    const obj = (
      <div className={classes.Question}>
        <h4>How am I pursuing my career objectives?</h4>
        <p>
          Within the past 3 months (July 2018 - Sep 2018), I spent many, many
          hours teaching myself HTML, CSS, JavaScript, React, a lots of other
          tools and methodologies, to build <i>this</i> website and several
          other projects. I have utilized web development tutorials on Udemy,
          developer documentation on React, Firebase, MDN, Stack Overflow (can't
          leave that one out), and Google Cloud Services. I have much more to
          learn and I am eager to improve my skills.
        </p>
      </div>
    );

    const consider = (
      <div className={classes.Question}>
        <h4>Why consider me? (Recruiters)</h4>
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
        <h4>What are my other passions?</h4>
        <p>
          Check out my <Link to="/photo">photography</Link> and see how I stay
          healthy with <Link to="/fitness">calisthenics</Link>.
        </p>
      </div>
    );

    const contact = (
      <div className={classes.Contact}>
        <h4>Contact me at:</h4>
        <h5>ycalvinhu@gmail.com</h5>
      </div>
    );

    return (
      <Reveal effect={classes.BlockSlideFadeIn}>
        <div className={classes.About}>
          <div className={classes.Me} />
          <div className={classes.ColorSplash} />
          <main>
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
