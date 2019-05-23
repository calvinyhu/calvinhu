import React from 'react';
import classnames from 'classnames';
import Fade from 'react-reveal/Fade';

import styles from './GalleryItem.module.scss';

const photoLoader = (
  <div className={styles.PhotoLoaderContainer}>
    <div className={styles.Loader} />
  </div>
);

const GalleryItem = props => {
  const imgContainerClasses = classnames({
    [styles.ImgContainer]: true,
    [styles.Hide]: true,
    [styles.Show]: props.isLoaded[props.id],
    [styles.ImgContainerHover]: props.hoverPhoto === props.id,
  });

  const detailsClasses = classnames({
    [styles.Details]: true,
    [styles.DetailsHover]:
      props.isLoaded[props.id] && props.hoverPhoto === props.id,
  });

  return (
    <Fade>
      <div
        className={styles.GalleryItem}
        onMouseOver={props.getHoverHandler(props.id)}
        onClick={props.getOpenHandler(props.id, props.photos[props.id].url)}
      >
        {props.isLoaded[props.id] ? null : photoLoader}
        <div className={imgContainerClasses}>
          <img
            onLoad={props.getLoadHandler(props.id)}
            src={props.photos[props.id].url}
            alt="calvinhu"
          />
        </div>
        <div className={detailsClasses}>
          <h5>{props.photos[props.id].name}</h5>
        </div>
      </div>
    </Fade>
  );
};

export default GalleryItem;