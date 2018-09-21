import React, { PureComponent } from 'react';

import classes from './About.css';

class About extends PureComponent {
  componentDidMount() {
    this.props.scrollIntoView();
  }

  render() {
    return (
      <div className={classes.About}>
        <div className={classes.Me} />
        <main>
          <h4>What are my other passions?</h4>
          <p>The two main ones are</p>
          <h5>Photography</h5>
          <h5>Calisthenics</h5>
        </main>
      </div>
    );
  }
}

export default About;
