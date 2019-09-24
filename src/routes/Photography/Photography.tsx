import React, { useEffect, useState } from 'react';
// @ts-ignore
import Fade from 'react-reveal/Fade';
// @ts-ignore
import throttle from 'raf-throttle';
import classnames from 'classnames';

import { Filters } from './Photography.models';
import { fetchPhotos, fetchUrls } from './Photography.api';
import Gallery from 'components/Gallery/Gallery';
import Fa from 'components/UI/Fa/Fa';
import Button from 'components/UI/Button/Button';
import { useResetScrollOnUnmount } from 'utils/hooks';

import styles from './Photography.module.scss';

let initialPhotos: firebase.firestore.DocumentData | undefined;
let timeout: NodeJS.Timeout;

const Photography = () => {
  // Get photos from firebase
  const [photos, setPhotos] = useState(initialPhotos);
  useEffect(() => {
    let didCancel = false;

    const getPhotos = async () => {
      const photos = (await fetchPhotos()) as firebase.firestore.DocumentData;
      const urls = await fetchUrls(photos);

      Object.keys(photos as object).forEach((id, index) => {
        photos[id].url = urls[index];
      });

      initialPhotos = photos;

      if (didCancel) return;

      setPhotos(photos);
    };

    if (!photos) getPhotos();

    return () => {
      didCancel = true;
    };
  });

  // Show more photos as page scrolls
  const [numPhotosLoaded, setNumPhotosLoaded] = useState(10);
  useEffect(() => {
    const showMorePhotos = () => {
      const { body, documentElement } = document;
      const height = Math.max(
        body.scrollHeight,
        documentElement.scrollHeight,
        body.offsetHeight,
        documentElement.offsetHeight,
        body.clientHeight,
        documentElement.clientHeight,
      );
      const isAtBottom = window.pageYOffset > height - window.innerHeight * 1.3;
      const totalNumPhotos = Object.keys(photos as object).length;
      const hasMorePhotos = numPhotosLoaded < totalNumPhotos;

      if (isAtBottom && hasMorePhotos) setNumPhotosLoaded(numPhotosLoaded + 10);
    };

    const handleScroll = () => throttle(showMorePhotos());

    const event = 'scroll';
    window.addEventListener(event, handleScroll);

    return () => {
      window.removeEventListener(event, handleScroll);
    };
  });

  // Show and hide touch app icon
  const [isHideTouchApp, setIsHideTouchApp] = useState(false);
  useEffect(() => {
    timeout = setTimeout(() => setIsHideTouchApp(true), 7000);
    return () => clearTimeout(timeout);
  });

  useResetScrollOnUnmount();

  const touchAppClasses = classnames({
    [styles.TouchApp]: true,
    [styles.HideTouchApp]: isHideTouchApp,
  });
  const touchAppIcon = (
    <div className={touchAppClasses}>
      <Fade>
        <Fa lg>fas fa-hand-point-up</Fa>
      </Fade>
    </div>
  );

  const initialFilters: Filters = {
    landscape: false,
    portrait: false,
    automobile: false,
  };
  const [filters, setFilters] = useState(initialFilters);
  const toggleLandscapeFilter = () =>
    setFilters({ ...filters, landscape: !filters.landscape });
  const togglePortaitFilter = () =>
    setFilters({ ...filters, portrait: !filters.portrait });
  const toggleAutomobileFilter = () =>
    setFilters({ ...filters, automobile: !filters.automobile });

  return (
    <div className={styles.PhotographyContainer}>
      <div className={styles.Filters}>
        <h4>Filter</h4>
        <div className={styles.FilterButtons}>
          <div className={styles.FilterButton}>
            <Button
              clear={!filters.landscape}
              ariaLabel="landscapes"
              click={toggleLandscapeFilter}
            >
              Landscape
            </Button>
          </div>
          <div className={styles.FilterButton}>
            <Button
              clear={!filters.portrait}
              ariaLabel="portraits"
              click={togglePortaitFilter}
            >
              Portaits
            </Button>
          </div>
          <div className={styles.FilterButton}>
            <Button
              clear={!filters.automobile}
              ariaLabel="automobile"
              click={toggleAutomobileFilter}
            >
              Automobile
            </Button>
          </div>
        </div>
      </div>
      <Gallery
        numPhotosLoaded={numPhotosLoaded}
        photos={photos}
        filters={filters}
      />
      {photos ? null : (
        <div className={styles.LoaderContainer}>
          <div className={styles.Loader} />
        </div>
      )}
      {touchAppIcon}
    </div>
  );
};

export default Photography;
