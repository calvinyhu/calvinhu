import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import styles from './Carousel.module.scss';
import Button from '../UI/Button/Button';
import Fa from '../UI/Fa/Fa';

class Carousel extends Component {
  static propTypes = {
    items: PropTypes.array.isRequired,
  };

  static defaultProps = {
    items: [],
  };

  state = {
    item: 0,
  };

  handleLeftClick = () => {
    let item = this.state.item;
    const itemLength = this.props.items.length;
    if (item === 0) item = -(itemLength - 1);
    else item++;
    this.setState({ item });
  };

  handleRightClick = () => {
    let item = this.state.item;
    const itemLength = this.props.items.length;
    if (item === -(itemLength - 1)) item = 0;
    else item--;
    this.setState({ item });
  };

  indicatorClickHandlers = {};
  getIndicatorClickHandler = index => {
    if (!this.indicatorClickHandlers[index]) {
      this.indicatorClickHandlers[index] = () =>
        this.handleClickIndicator(index);
    }
    return this.indicatorClickHandlers[index];
  };
  handleClickIndicator = index => this.setState({ item: -index });

  render() {
    let carouselItems = [];
    let carouselIndicators = [];

    if (this.props.items.length > 0) {
      this.props.items.forEach((item, index) => {
        const carouselItemClasses = classnames({
          [styles.CarouselItem]: true,
          [styles.ObjectPosition25Center]: index === 1,
        });
        carouselItems.push(
          <div key={index} className={carouselItemClasses}>
            <img src={item} alt="item" />
          </div>,
        );

        const carouselIndicatorClasses = classnames({
          [styles.CarouselIndicator]: true,
          [styles.ActiveIndicator]: index === -this.state.item,
        });
        carouselIndicators.push(
          <div
            key={index}
            className={styles.CarouselIndicatorContainer}
            onClick={this.getIndicatorClickHandler(index)}
          >
            <div className={carouselIndicatorClasses} />
          </div>,
        );
      });
    }

    const carouselPosition = {
      transform: `translateX(${this.state.item * 100}%)`,
    };
    return (
      <div className={styles.Carousel}>
        <div style={carouselPosition} className={styles.CarouselTrack}>
          {carouselItems}
        </div>

        <div className={styles.CarouselLeft}>
          <Button clear click={this.handleLeftClick}>
            <Fa twoX white>
              fas fa-angle-left
            </Fa>
          </Button>
        </div>
        <div className={styles.CarouselRight}>
          <Button clear click={this.handleRightClick}>
            <Fa twoX white>
              fas fa-angle-right
            </Fa>
          </Button>
        </div>

        <div className={styles.CarouselIndicators}>{carouselIndicators}</div>
      </div>
    );
  }
}

export default Carousel;
