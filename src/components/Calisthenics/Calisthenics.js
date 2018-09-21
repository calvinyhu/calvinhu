import React, { PureComponent } from 'react';

import classes from './Calisthenics.css';

class Calisthenics extends PureComponent {
  componentDidMount() {
    this.props.scrollIntoView();
  }

  render() {
    let caliClasses = classes.Calisthenics + ' ' + classes.Hide;
    if (this.props.isAnimateCaliScroll)
      caliClasses = classes.Calisthenics + ' ' + classes.BlockSlideFadeIn;

    return (
      <div className={caliClasses}>
        <h3>The Body I've Built</h3>
        <div className={classes.Timeline}>
          <h3>2013</h3>
          <p>Started body building routine</p>
          <p>6 day routine</p>
          <h3>2014</h3>
          <p>Mid-year switched to calisthenics training</p>
          <p>Inspired by Frank Medrano</p>
          <h3>2015</h3>
          <p>End of year weight plateau at 153 pounds</p>
          <h3>2016</h3>
          <p>Lost motivation beginning of 2016</p>
          <h3>2017</h3>
          <p>Maintaining body weight</p>
          <h3>2018</h3>
          <p>Motivation is back starting 2018</p>
          <h3>2019</h3>
          <p>?</p>
        </div>
      </div>
    );
  }
}

export default Calisthenics;
