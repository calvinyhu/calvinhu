import { FC } from 'react';
import clsx from 'clsx';
import { useSpring, animated } from 'react-spring';
import firebase from 'firebase';

import { useGetPhotos, useHideTouchAppIcon, useLoadPhotosOnScroll } from './Photography.hooks';
import Gallery from 'components/Gallery/Gallery';
import Fa from 'components/UI/Fa/Fa';
import { useResetScrollOnUnmount } from 'utils/hooks';

import styles from './Photography.module.scss';

const PHOTOGRAPHY_TYPES: { [key: string]: number } = {
  portraits: 0,
  travel: 1,
  automotive: 2,
};

interface PhotographyProps {
  path: string;
}

const Photography: FC<PhotographyProps> = ({ path }) => {
  const photos = useGetPhotos();

  const totalNumPhotos = photos ? Object.keys(photos as Record<string, unknown>).length : 0;
  const numPhotosLoaded = useLoadPhotosOnScroll(totalNumPhotos);

  const isHideTouchApp = useHideTouchAppIcon();

  useResetScrollOnUnmount();

  const spring = useSpring({ opacity: 1, from: { opacity: 0 } });
  const touchAppClasses = clsx({
    [styles.TouchApp]: true,
    [styles.HideTouchApp]: isHideTouchApp,
  });
  const touchAppIcon = (
    <animated.div style={spring} className={touchAppClasses}>
      <Fa lg>fas fa-hand-point-up</Fa>
    </animated.div>
  );

  const filterPhotos = (photos: firebase.firestore.DocumentData) => {
    if (!photos) return photos;

    const filteredPhotos: { [id: string]: Record<string, unknown> } = {};

    Object.entries(photos).forEach((entry) => {
      if (entry[1].type === PHOTOGRAPHY_TYPES[path]) {
        filteredPhotos[entry[0]] = photos[entry[0]];
      }
    });

    return filteredPhotos;
  };

  return (
    <div className={styles.PhotographyContainer}>
      <Gallery numPhotosLoaded={numPhotosLoaded} photos={filterPhotos(photos)} />
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
