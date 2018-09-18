import React from 'react';

import classes from './Photography.css';
import gallery from '../../assets/images/gallery.jpg';
import myphoto1 from '../../assets/images/myphoto1.png';

const photography = props => {
  let photographyClasses = classes.Photography + ' ' + classes.Hide;
  if (props.isShowPhotography)
    photographyClasses = classes.Photography + ' ' + classes.BlockSlideFadeIn;

  return (
    <div className={photographyClasses}>
      <h4>My Photos</h4>
      <div className={classes.Gallery}>
        <div className={classes.GalleryBackground}>
          <img src={gallery} alt="gallery" />
          <div className={classes.GalleryItem}>
            <img src={myphoto1} alt="my" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default photography;
