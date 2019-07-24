import React from 'react';
import classnames from 'classnames';

import styles from './GalleryItem.module.scss';

interface GalleryItemProps {
  getHoverHandler: (id: string) => void;
  getLoadHandler: (id: string) => void;
  getOpenHandler: (id: string, url: string) => void;
  hoverPhoto: string;
  id: string;
  // eslint-disable-next-line
  isLoaded: any;
  // eslint-disable-next-line
  photos: any;
}

const photoLoader = (
  <div className={styles.PhotoLoaderContainer}>
    <div className={styles.Loader} />
  </div>
);

const GalleryItem = ({
  getHoverHandler,
  getLoadHandler,
  getOpenHandler,
  hoverPhoto,
  id,
  isLoaded,
  photos,
}: GalleryItemProps) => {
  const imgContainerClasses = classnames({
    [styles.ImgContainer]: true,
    [styles.Hide]: true,
    [styles.Show]: isLoaded[id],
    [styles.ImgContainerHover]: hoverPhoto === id,
  });

  return (
    <div
      className={styles.GalleryItem}
      // @ts-ignore
      onMouseOver={getHoverHandler(id)}
      // @ts-ignore
      onClick={getOpenHandler(id, photos[id].url)}
    >
      {isLoaded[id] ? null : photoLoader}
      <div className={imgContainerClasses}>
        {/*
        // @ts-ignore */}
        <img onLoad={getLoadHandler(id)} src={photos[id].url} alt="calvinhu" />
      </div>
    </div>
  );
};

export default GalleryItem;
