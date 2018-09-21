import React, { PureComponent } from 'react';

import classes from './Resume.css';

class Resume extends PureComponent {
  componentDidMount() {
    this.props.scrollIntoView();
  }

  render() {
    return (
      <div className={classes.Resume}>
        <div className={classes.Left}>
          <div className={classes.Education}>
            <h5>Education</h5>
            <p>Bachelor of Science in Computer Science</p>
            <p>Minored in Technology Management</p>
            <p>University of California, Davis | Class of 2018</p>
          </div>
          <div className={classes.TS}>
            <h5>Technologies</h5>
            <h6>Languages</h6>
            <p>JavaScript / HTML / CSS (self-taught)</p>
            <p>C++ / C (UC Davis)</p>
            <h6>Frameworks</h6>
            <p>React (self-taught)</p>
            <p>SASS (self-taught)</p>
            <p />
          </div>
        </div>
        <div className={classes.Experience}>
          <h5>Experience</h5>
          <p>Software Engineer Intern</p>
          <p>Redpine Signals</p>
          <p>San Jose, CA</p>
        </div>
      </div>
    );
  }
}

export default Resume;
