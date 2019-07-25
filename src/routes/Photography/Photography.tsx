import React, { useEffect, useState } from 'react';
// @ts-ignore
import Fade from 'react-reveal/Fade';
// @ts-ignore
import throttle from 'raf-throttle';
import classnames from 'classnames';

import { Filters } from './Photography.models';
import Gallery from 'components/Gallery/Gallery';
import Fa from 'components/UI/Fa/Fa';
import Button from 'components/UI/Button/Button';
import { firestore, storage } from 'config/firebase';
import { useResetScrollOnUnmount } from 'utils/hooks';

import styles from './Photography.module.scss';

let initialPhotos: firebase.firestore.DocumentData | undefined;
let initialTotalNumPhotos = 0;
let timeout: NodeJS.Timeout;

const Photography = () => {
  // Get photos from firebase
  const [photos, setPhotos] = useState(initialPhotos);
  const [totalNumPhotos, setTotalNumPhotos] = useState(initialTotalNumPhotos);
  useEffect(() => {
    let isMounted = true;

    const getUrls = (data: firebase.firestore.DocumentData | undefined) => {
      const urlPromises: Promise<string>[] = [];

      const ids = Object.keys(data as object);
      ids.forEach(id => {
        const urlPromise: Promise<string> = storage
          .ref(`photography/${id}`)
          .getDownloadURL();
        urlPromises.push(urlPromise);
      });

      return Promise.all(urlPromises).then(urls => urls);
    };

    const getPhotos = async () => {
      let data: firebase.firestore.DocumentData | undefined;
      const urls = await firestore
        .collection('photography')
        .doc('photoDetails')
        .get()
        .then(doc => {
          if (doc.exists) {
            data = doc.data();
            return getUrls(data);
          } else throw Error('Photo details document does not exist!');
        })
        .catch((error: Error) => console.log(error));

      if (!urls) return;

      const ids = Object.keys(data as object);
      ids.forEach((id, index) => {
        if (data) data[id].url = urls[index];
      });

      initialPhotos = data;
      initialTotalNumPhotos = ids.length;

      if (!isMounted) return;
      setPhotos(data);
      setTotalNumPhotos(ids.length);
    };

    if (!photos) getPhotos();

    return () => {
      isMounted = false;
    };
  });

  // Show more photos on scroll
  const [numPhotos, setNumPhotos] = useState(10);
  useEffect(() => {
    const showMorePhotos = () => {
      const scrollHeight = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight,
        document.body.clientHeight,
        document.documentElement.clientHeight,
      );
      const isAtBottom =
        window.pageYOffset > scrollHeight - window.innerHeight * 1.3;
      const isMorePhotos = numPhotos < totalNumPhotos;

      if (isAtBottom && isMorePhotos) setNumPhotos(numPhotos + 10);
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
      <Gallery numPhotos={numPhotos} photos={photos} filters={filters} />
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
