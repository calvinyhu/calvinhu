import React from 'react';

import classes from './Calisthenics.css';

const calisthenics = props => {
  let caliClasses = classes.Calisthenics + ' ' + classes.Hide;
  if (props.isAnimatePageScroll)
    caliClasses = classes.Calisthenics + ' ' + classes.BlockSlideFadeIn;

  return (
    <div className={caliClasses}>
      <h4>My Health</h4>
      <p>I workout 4 days a week, 1 hour per session.</p>
    </div>
  );
};

export default calisthenics;
