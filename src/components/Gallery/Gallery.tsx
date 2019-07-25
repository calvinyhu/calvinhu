import React, { useState } from 'react';
import classnames from 'classnames';

import styles from './Gallery.module.scss';
import GalleryItem from './GalleryItem/GalleryItem';
import { Filters, TYPES } from 'routes/Photography/Photography.models';

interface GalleryProps {
  numPhotos: number;
  photos: firebase.firestore.DocumentData | undefined;
  filters: Filters;
}

interface Handler {
  [photoId: string]: () => void;
}

interface IsLoaded {
  [photoId: string]: boolean;
}

const Gallery = ({ numPhotos, photos, filters }: GalleryProps) => {
  const [hoverPhoto, setHoverPhoto] = useState('');
  const [isExpandPhoto, setIsExpandPhoto] = useState(false);
  const initIsLoaded: IsLoaded = {};
  const [isLoaded, setIsLoaded] = useState(initIsLoaded);
  const [src, setSrc] = useState('');

  const hoverHandlers: Handler = {};
  const getHoverHandler = (photoId: string) => {
    if (!hoverHandlers[photoId]) {
      hoverHandlers[photoId] = () => {
        if (hoverPhoto !== photoId) setHoverPhoto(photoId);
      };
    }
    return hoverHandlers[photoId];
  };

  const loadHandlers: Handler = {};
  const getLoadHandler = (photoId: string) => {
    if (!loadHandlers[photoId]) {
      loadHandlers[photoId] = () => {
        const tempIsLoaded: IsLoaded = { ...isLoaded };
        tempIsLoaded[photoId] = true;
        setIsLoaded(tempIsLoaded);
      };
    }
    return loadHandlers[photoId];
  };

  const openHandlers: Handler = {};
  const getOpenHandler = (id: string, src: string) => {
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
    setSrc('');
  };
  const handleMouseLeave = () => {
    setHoverPhoto('');
  };

  const renderGalleryItems = () => {
    if (!photos) return null;

    const galleryItems: React.ReactNodeArray = [];
    const isFiltersOn = Boolean(Object.values(filters).filter(Boolean).length);

    Object.keys(photos).forEach(id => {
      const isPhotoCorrectType = !filters[TYPES[photos[id].type]];

      if (
        galleryItems.length + 1 > numPhotos ||
        (isFiltersOn && isPhotoCorrectType)
      )
        return;

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

  const cardClasses = classnames(styles.Card, {
    [styles.CardShow]: isExpandPhoto,
  });
  const card = (
    <div className={cardClasses} onClick={handleClose}>
      <img className="card-img-top" src={src} alt="calvinhu" />
    </div>
  );

  return (
    <>
      <div className={styles.Gallery} onMouseLeave={handleMouseLeave}>
        {renderGalleryItems()}
      </div>
      {card}
    </>
  );
};

export default Gallery;
