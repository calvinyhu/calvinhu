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
        <h4>My Health</h4>
        <p>I workout 4 days a week, 1 hour per session.</p>
      </div>
    );
  }
}

export default Calisthenics;
