import React, { useState } from 'react';
// @ts-ignore
import Fade from 'react-reveal/Fade';
import classnames from 'classnames';

import { Filters } from './Photography.models';
import {
  useGetPhotos,
  useHideTouchAppIcon,
  useLoadPhotosOnScroll,
} from './Photography.hooks';
import Gallery from 'components/Gallery/Gallery';
import Fa from 'components/UI/Fa/Fa';
import Button from 'components/UI/Button/Button';
import { useResetScrollOnUnmount } from 'utils/hooks';
import { useIsPhotosEnabled } from 'store/hooks/app';

import styles from './Photography.module.scss';

const Photography = () => {
  const photos = useGetPhotos();

  const totalNumPhotos = photos ? Object.keys(photos as object).length : 0;
  const numPhotosLoaded = useLoadPhotosOnScroll(totalNumPhotos);

  const isHideTouchApp = useHideTouchAppIcon();

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
      {useIsPhotosEnabled() && (
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
      )}
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
