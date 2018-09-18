import React from 'react';

import classes from './Calisthenics.css';

const calisthenics = props => {
  let caliClasses = classes.Calisthenics + ' ' + classes.Hide;
  if (props.isShowCalisthenics)
    caliClasses = classes.Calisthenics + ' ' + classes.BlockSlideFadeIn;

  return (
    <div className={caliClasses}>
      <h4>My Health</h4>
    </div>
  );
};

export default calisthenics;
