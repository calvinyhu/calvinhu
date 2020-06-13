import React from 'react';
// @ts-ignore
import Fade from 'react-reveal/Fade';
import clsx from 'clsx';

import {
  useGetPhotos,
  useHideTouchAppIcon,
  useLoadPhotosOnScroll,
} from './Photography.hooks';
import Gallery from 'components/Gallery/Gallery';
import Fa from 'components/UI/Fa/Fa';
import { useResetScrollOnUnmount } from 'utils/hooks';

import styles from './Photography.module.scss';

const Photography = (props: any) => {
  const photos = useGetPhotos();

  const totalNumPhotos = photos ? Object.keys(photos as object).length : 0;
  const numPhotosLoaded = useLoadPhotosOnScroll(totalNumPhotos);

  const isHideTouchApp = useHideTouchAppIcon();

  useResetScrollOnUnmount();

  const touchAppClasses = clsx({
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
      <Gallery numPhotosLoaded={numPhotosLoaded} photos={photos} />
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
