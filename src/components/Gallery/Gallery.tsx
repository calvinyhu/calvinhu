import React, { useState } from 'react';
import classnames from 'classnames';

import styles from './Gallery.module.scss';
import GalleryItem from './GalleryItem/GalleryItem';

interface GalleryProps {
  numPhotos: number;
  // eslint-disable-next-line
  photos: any;
}

const Gallery = ({ numPhotos, photos }: GalleryProps) => {
  const [hoverPhoto, setHoverPhoto] = useState('');
  const [isExpandPhoto, setIsExpandPhoto] = useState(false);
  // eslint-disable-next-line
  const [isLoaded, setIsLoaded] = useState({} as any);
  const [src, setSrc] = useState('');

  // eslint-disable-next-line
  const hoverHandlers: any = {};
  const getHoverHandler = (photoId: string) => {
    if (!hoverHandlers[photoId]) {
      hoverHandlers[photoId] = () => {
        if (hoverPhoto !== photoId) setHoverPhoto(photoId);
      };
    }
    return hoverHandlers[photoId];
  };

  // eslint-disable-next-line
  const loadHandlers: any = {};
  const getLoadHandler = (photoId: string) => {
    if (!loadHandlers[photoId]) {
      loadHandlers[photoId] = () => {
        // eslint-disable-next-line
        const tempIsLoaded: any = { ...isLoaded };
        tempIsLoaded[photoId] = true;
        setIsLoaded(tempIsLoaded);
      };
    }
    return loadHandlers[photoId];
  };

  // eslint-disable-next-line
  const openHandlers: any = {};
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

    // eslint-disable-next-line
    const galleryItems: any = [];

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
