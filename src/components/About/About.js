import React, { PureComponent } from 'react';

import classes from './About.css';

class About extends PureComponent {
  componentDidMount() {
    this.props.scrollIntoView();
  }

  render() {
    let aboutClasses = classes.About + ' ' + classes.Hide;
    if (this.props.isAnimateAboutScroll)
      aboutClasses = classes.About + ' ' + classes.BlockSlideFadeIn;

    return (
      <div className={aboutClasses}>
        <div className={classes.Me} />
        <main>
          <h4>Calvin Who?</h4>
          <h6>Calvin Hu! (punny)</h6>
          <p>
            I am a recent UC Davis graduate, currently seeking an entry-level
            web development position in the Bay Area. Previously, I have
            developed C++ and C applications that simulate vehicle traffic to
            test hardware capabilities for various traffic scenarios, including
            blind spot warning detection, forward collision warning, and
            automatic toll collection. I am a generalist, actively pursuing a
            specialization in full-stack web development.
          </p>
          <h4>How am I pursuing my career objectives?</h4>
          <p>
            Within the past 3 months (July 2018 - Sep 2018), I spent many, many
            hours teaching myself HTML, CSS, JavaScript, React, a lots of other
            tools and methodologies, to build <i>this</i> website and several
            other projects. I have utilized web developer tutorials on Udemy,
            developer documentation on React, Firebase, MDN, Stack Overflow
            (can't leave that one out), and Google Cloud Services. I have much
            more to learn and I am eager to improve my skills.
          </p>
          <h4>Why consider me? (Recruiters)</h4>
          <p>
            I have unrelenting determination to achieve milestones utilizing the
            best and thoughtful methods. I am extremely organized both virtually
            and physically, but also very adaptable. I love challenging myself
            and I love learning. I have the right skills and mindset to achieve
            my goals once I lay my eyes on them.
          </p>
          <h4>What are my other passions?</h4>
          <p className={classes.Passions}>
            Check my <a>photography</a> and see how I stay healthy with{' '}
            <a>calisthenics</a>
          </p>
          <div className={classes.Sink}>
            <h4>Contact me at:</h4>
            <h5>ycalvinhu@gmail.com</h5>
          </div>
        </main>
      </div>
    );
  }
}

export default About;
