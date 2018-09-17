import React from 'react';

import classes from './Photography.css';

const photography = props => {
  let photographyClasses = classes.Photography + ' ' + classes.Hide;
  if (props.isShowPhotography)
    photographyClasses = classes.Photography + ' ' + classes.BlockSlideFadeIn;

  return (
    <div className={photographyClasses}>
      <h4>My Photos</h4>
      <div className={classes.Gallery}>Gallery</div>
    </div>
  );
};

export default photography;
