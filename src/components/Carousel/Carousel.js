import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './Carousel.module.scss';
import Button from '../UI/Button/Button';
import Fa from '../UI/Icon/Fa/Fa';

class Carousel extends Component {
  static propTypes = {
    items: PropTypes.array.isRequired
  };

  static defaultProps = {
    items: []
  };

  state = {
    pic: 0
  };

  handleLeftClick = () => {
    let pic = this.state.pic;
    const itemLength = this.props.items.length;
    if (pic === 0) pic = -(itemLength - 1);
    else pic++;
    this.setState({ pic });
  };

  handleRightClick = () => {
    let pic = this.state.pic;
    const itemLength = this.props.items.length;
    if (pic === -(itemLength - 1)) pic = 0;
    else pic--;
    this.setState({ pic });
  };

  render() {
    let carouselItems = [];
    if (this.props.items && this.props.items.length > 0) {
      carouselItems = this.props.items.map((item, index) => (
        <div key={index} className={styles.CarouselItem}>
          <img src={item} alt="item" />
        </div>
      ));
    }

    const carouselPosition = {
      transform: `translateX(${this.state.pic * 100}%)`
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
      </div>
    );
  }
}

export default Carousel;
