import React from 'react';

import classes from './Photography.css';
import myphoto1 from '../../assets/images/myphoto1.png';

const photography = props => {
  let photographyClasses = classes.Photography + ' ' + classes.Hide;
  if (props.isAnimatePageScroll)
    photographyClasses = classes.Photography + ' ' + classes.BlockSlideFadeIn;

  let photos = null;

  return (
    <div className={photographyClasses}>
      <h4>My Gallery</h4>
      {photos}
      <div className={classes.ImgContainer}>
        <img src={myphoto1} alt="mtns" />
      </div>
    </div>
  );
};

export default photography;
