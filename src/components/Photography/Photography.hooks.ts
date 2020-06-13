import { useEffect, useState } from 'react';
// @ts-ignore
import throttle from 'raf-throttle';

import { fetchPhotos, fetchUrls } from './Photography.api';

// Get photos from firebase
let initialPhotos: firebase.firestore.DocumentData | undefined;
export const useGetPhotos = () => {
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

  return photos;
};

// Load more photos when the page is at the bottom
export const useLoadPhotosOnScroll = (totalNumPhotos: number) => {
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

  return numPhotosLoaded;
};

// Hide the touch app icon after a set time
let timeout: NodeJS.Timeout;
export const useHideTouchAppIcon = () => {
  const [isHideTouchApp, setIsHideTouchApp] = useState(false);

  useEffect(() => {
    timeout = setTimeout(() => setIsHideTouchApp(true), 7000);
    return () => clearTimeout(timeout);
  });

  return isHideTouchApp;
};
