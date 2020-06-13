import React, { useState } from 'react';
import clsx from 'clsx';

import Button from 'components/UI/Button/Button';
import Fa from 'components/UI/Fa/Fa';
import { CarouselProps, IndicatorClickHandlers } from './Carousel.models';

import styles from './Carousel.module.scss';

const Carousel = ({ items }: CarouselProps) => {
  const [item, setItem] = useState(0);

  const handleLeftClick = () =>
    setItem(item === 0 ? -(items.length - 1) : item + 1);

  const handleRightClick = () =>
    setItem(item === -(items.length - 1) ? 0 : item - 1);

  const handleClickIndicator = (index: number) => setItem(-index);

  const indicatorClickHandlers: IndicatorClickHandlers = {};
  const getIndicatorClickHandler = (index: number) => {
    if (!indicatorClickHandlers[index]) {
      indicatorClickHandlers[index] = () => handleClickIndicator(index);
    }
    return indicatorClickHandlers[index];
  };

  const carouselItems: React.ReactElement[] = [];
  const carouselIndicators: React.ReactElement[] = [];

  if (items.length > 0) {
    items.forEach((item, index) => {
      const carouselItemClasses = clsx({
        [styles.CarouselItem]: true,
        [styles.ObjectPosition25Center]: index === 1,
      });
      carouselItems.push(
        <div key={index} className={carouselItemClasses}>
          <img src={item} alt="item" />
        </div>,
      );

      const carouselIndicatorClasses = clsx({
        [styles.CarouselIndicator]: true,
        [styles.ActiveIndicator]: index === -item,
      });
      carouselIndicators.push(
        <div
          key={index}
          className={styles.CarouselIndicatorContainer}
          onClick={getIndicatorClickHandler(index)}
        >
          <div className={carouselIndicatorClasses} />
        </div>,
      );
    });
  }

  const carouselPosition = {
    transform: `translateX(${item * 100}%)`,
  };

  return (
    <div className={styles.Carousel}>
      <div style={carouselPosition} className={styles.CarouselTrack}>
        {carouselItems}
      </div>

      <div className={styles.CarouselLeft}>
        <Button clear ariaLabel={'previous slide'} click={handleLeftClick}>
          <Fa twoX white>
            fas fa-angle-left
          </Fa>
        </Button>
      </div>
      <div className={styles.CarouselRight}>
        <Button clear ariaLabel={'next slide'} click={handleRightClick}>
          <Fa twoX white>
            fas fa-angle-right
          </Fa>
        </Button>
      </div>

      <div className={styles.CarouselIndicators}>{carouselIndicators}</div>
    </div>
  );
};

export default Carousel;
