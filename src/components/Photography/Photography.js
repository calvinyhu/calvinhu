import React from 'react';

import classes from './Photography.css';

const photography = props => {
  let photographyClasses = classes.Photography + ' ' + classes.Hide;
  if (props.isAnimatePageScroll)
    photographyClasses = classes.Photography + ' ' + classes.BlockSlideFadeIn;

  const gallery = [];
  if (props.photos) {
    const photoIds = Object.keys(props.photos);
    photoIds.forEach(id => {
      gallery.push(
        <div className={classes.ImgContainer} key={id}>
          <img src={props.photos[id]} alt="calvinhu" />
        </div>
      );
    });
  }

  return (
    <div className={photographyClasses}>
      <h4>My Gallery</h4>
      <div className={classes.Gallery}>{gallery}</div>
    </div>
  );
};

export default photography;
