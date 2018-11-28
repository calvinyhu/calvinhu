import React from 'react';
import PropTypes from 'prop-types';

import styles from './Carousel.module.scss';
import Button from '../UI/Button/Button';
import Fa from '../UI/Icon/Fa/Fa';

const carousel = props => {
  carousel.propTypes = {
    items: PropTypes.array.isRequired
  };

  carousel.defaultProps = {
    items: []
  };

  let carouselItems = [];
  if (props.items && props.items.length > 0) {
    carouselItems = props.items.map((item, index) => (
      <div key={index} className={styles.CarouselItem}>
        <img src={item} alt="item" />
      </div>
    ));
  }

  return (
    <div className={styles.Carousel}>
      <div className={styles.CarouselTrack}>{carouselItems}</div>

      <div className={styles.CarouselLeft}>
        <Button>
          <Fa threeX>fas fa-angle-left</Fa>
        </Button>
      </div>
      <div className={styles.CarouselRight}>
        <Button>
          <Fa threeX>fas fa-angle-right</Fa>
        </Button>
      </div>
    </div>
  );
};

export default carousel;
