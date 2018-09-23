import React, { PureComponent } from 'react';
import Reveal from 'react-reveal/Reveal';

import classes from './Resume.css';

class Resume extends PureComponent {
  componentDidMount() {
    this.props.scrollIntoView();
  }

  render() {
    const left = (
      <div className={classes.Left}>
        <div className={classes.Education}>
          <h5>Education</h5>
          <div>
            <h6>B.S. in Computer Science</h6>
            <p>Minor in Technology Management</p>
            <h6>University of California, Davis</h6>
          </div>
        </div>
        <div className={classes.Technologies}>
          <h5>Technologies</h5>
          <div className={classes.TechnologiesDetails}>
            <div>
              <h6>Languages</h6>
              <p>JavaScript</p>
              <p>SASS</p>
              <p>HTML / CSS</p>
              <p>C++ / C</p>
              <p>Python</p>
            </div>
            <div>
              <h6>Tools</h6>
              <p>React</p>
              <p>gulp</p>
              <p>Git</p>
              <p>VS Code</p>
              <p>Vim</p>
            </div>
            <div>
              <h6>Methods</h6>
              <p>Mobile First</p>
              <p>OOP</p>
              <p>Progressive</p>
            </div>
          </div>
        </div>
      </div>
    );

    const right = (
      <div className={classes.Experience}>
        <h5>Experience</h5>
        <div>
          <h6>Software Engineer Intern</h6>
          <h6>June 2017 – Sep 2017</h6>
        </div>
        <p>Redpine Signals in San Jose, CA</p>
        <i className={classes.CompanyDescription}>
          Leading provider of ultra-low power, high performance wireless
          solutions for next generation applications
        </i>
        <ul>
          <li>Implemented 7+ vehicle traffic simulations in C++ and C</li>
          <li>
            Designed road maps and vehicle traffic in XML using OMNET++ and SUMO
          </li>
          <li>
            Integrated physical chipsets into vehicle simulations to test
            real-time short-range communications
          </li>
          <li>
            Applied Git source code control to maintain readability and
            maintainability, and streamline peer review
          </li>
        </ul>
      </div>
    );

    return (
      <Reveal effect={classes.BlockSlideFadeIn}>
        <div className={classes.Resume}>
          <Reveal effect={classes.BlockSlideFadeIn}>
            {left}
            {right}
          </Reveal>
        </div>
      </Reveal>
    );
  }
}

export default Resume;
