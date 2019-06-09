import React, { useEffect, useState } from 'react';
import Fade from 'react-reveal/Fade';
import throttle from 'raf-throttle';
import classnames from 'classnames';

import styles from './Photography.module.scss';
import Gallery from '../../components/Gallery/Gallery';
import Fa from '../../components/UI/Fa/Fa';
import { firestore, storage } from '../../firebase';

let initialPhotos = null;
let initialTotalNumPhotos = 0;
let timeout = null;

const Photography = () => {
  const [photos, setPhotos] = useState(initialPhotos);
  const [totalNumPhotos, setTotalNumPhotos] = useState(initialTotalNumPhotos);
  useEffect(() => {
    const getUrls = data => {
      const urlPromises = [];

      const ids = Object.keys(data);
      ids.forEach(id => {
        const urlPromise = storage.ref(`photography/${id}`).getDownloadURL();
        urlPromises.push(urlPromise);
      });

      return Promise.all(urlPromises).then(urls => urls);
    };

    const getPhotos = async () => {
      let data = null;
      const urls = await firestore
        .collection('photography')
        .doc('photoDetails')
        .get()
        .then(doc => {
          if (doc.exists) {
            data = doc.data();
            return getUrls(data);
          } else console.log('Photo details do not exist!');
        })
        .catch(error => console.log(error));

      const ids = Object.keys(data);
      ids.forEach((id, index) => (data[id].url = urls[index]));

      initialPhotos = data;
      initialTotalNumPhotos = ids.length;

      if (!isMounted) return;
      setPhotos(data);
      setTotalNumPhotos(ids.length);
    };

    if (!photos) getPhotos();

    let isMounted = true;
    return () => (isMounted = false);
  });

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

  const [isHideTouchApp, setIsHideTouchApp] = useState(false);
  useEffect(() => {
    timeout = setTimeout(() => setIsHideTouchApp(true), 7000);
    return () => clearTimeout(timeout);
  });

  useEffect(() => {
    const currentPath = window.location.pathname;
    return () => {
      const nextPath = window.location.pathname;
      if (nextPath !== currentPath && window.pageYOffset) {
        window.scrollTo({ top: 0 });
      }
    };
  });

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

  return (
    <div className={styles.PhotographyContainer}>
      <Gallery numPhotos={numPhotos} photos={photos} />
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
