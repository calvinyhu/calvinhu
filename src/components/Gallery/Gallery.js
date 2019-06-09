import React, { useState } from 'react';
import classnames from 'classnames';

import styles from './Gallery.module.scss';
import GalleryItem from './GalleryItem/GalleryItem';

const Gallery = ({ numPhotos, photos }) => {
  const [hoverPhoto, setHoverPhoto] = useState(null);
  const [isExpandPhoto, setIsExpandPhoto] = useState(false);
  const [isLoaded, setIsLoaded] = useState({});
  const [src, setSrc] = useState(null);

  const hoverHandlers = {};
  const getHoverHandler = photoId => {
    if (!hoverHandlers[photoId]) {
      hoverHandlers[photoId] = () => {
        if (hoverPhoto !== photoId) setHoverPhoto(photoId);
      };
    }
    return hoverHandlers[photoId];
  };

  const loadHandlers = {};
  const getLoadHandler = photoId => {
    if (!loadHandlers[photoId]) {
      loadHandlers[photoId] = () => {
        const tempIsLoaded = { ...isLoaded };
        tempIsLoaded[photoId] = true;
        setIsLoaded(tempIsLoaded);
      };
    }
    return loadHandlers[photoId];
  };

  const openHandlers = {};
  const getOpenHandler = (id, src) => {
    if (!openHandlers[id]) {
      openHandlers[id] = () => {
        if (!isLoaded[id]) return;
        setIsExpandPhoto(true);
        setSrc(src);
      };
    }
    return openHandlers[id];
  };

  const handleClose = () => {
    setIsExpandPhoto(false);
    setSrc(null);
  };
  const handleMouseLeave = () => {
    setHoverPhoto(null);
  };

  const renderGalleryItems = () => {
    if (!photos) return null;

    const galleryItems = [];

    const photoIds = Object.keys(photos);
    photoIds.forEach((id, index) => {
      if (index + 1 > numPhotos) return;
      galleryItems.push(
        <GalleryItem
          key={id}
          getHoverHandler={getHoverHandler}
          getOpenHandler={getOpenHandler}
          getLoadHandler={getLoadHandler}
          hoverPhoto={hoverPhoto}
          id={id}
          isLoaded={isLoaded}
          photos={photos}
        />,
      );
    });

    return galleryItems;
  };

  const galleryItems = renderGalleryItems();

  const cardClasses = classnames({
    card: true,
    [styles.Card]: true,
    [styles.CardShow]: isExpandPhoto,
  });
  const card = (
    <div className={cardClasses} onClick={handleClose}>
      <img className="card-img-top" src={src} alt="calvinhu" />
    </div>
  );

  return (
    <React.Fragment>
      <div className={styles.Gallery} onMouseLeave={handleMouseLeave}>
        {galleryItems}
      </div>
      {card}
    </React.Fragment>
  );
};

export default Gallery;
