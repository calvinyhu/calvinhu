import React, { Component } from 'react';
import Reveal from 'react-reveal/Reveal';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import styles from './ProjectItem.module.scss';

class ProjectItem extends Component {
  state = {
    isLoaded: {}
  };

  loadHandlers = {};
  getLoadHandler = id => {
    if (!this.loadHandlers[id]) {
      this.loadHandlers[id] = () => {
        const isLoaded = { ...this.state.isLoaded };
        isLoaded[id] = true;
        this.setState({ isLoaded });
      };
    }
    return this.loadHandlers[id];
  };

  render() {
    const colorSplashClassNames = classnames({
      [styles.ColorSplash]: true,
      [styles.ShmackColorSplash]: this.props.themeColor === 1,
      [styles.JammmingColorSplash]: this.props.themeColor === 2
    });

    let carouselItems = [];
    if (this.props.srcs.length > 0) {
      this.props.srcs.forEach((src, index) => {
        const carouselItemClasses = classnames({
          [styles.CarouselItem]: true,
          [styles.Hide]: true,
          [styles.Show]: this.state.isLoaded[src]
        });

        carouselItems.push(
          <div key={index} className={carouselItemClasses}>
            <div className={styles.ImgContainer}>
              <img
                src={src}
                alt={this.props.alt}
                onLoad={this.getLoadHandler(src)}
              />
            </div>
          </div>
        );
      });
    } else {
      carouselItems.push(
        <div key={1} className={styles.LoaderContainer}>
          <div className={styles.Loader} />
        </div>
      );
    }

    let header = null;
    if (this.props.header) header = <h3>{this.props.header}</h3>;

    return (
      <div className={styles.ProjectItem}>
        <div className={styles.ProjectContent}>
          <div className={colorSplashClassNames} />
          <div className={styles.Description}>
            {header}
            <p>{this.props.description}</p>
            <p>
              Check it out @{' '}
              <a
                href={this.props.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {this.props.name}
              </a>
            </p>
          </div>
          <Reveal effect={styles.BlockSlideFadeIn}>
            <div className={styles.Carousel}>{carouselItems}</div>
          </Reveal>
        </div>
      </div>
    );
  }
}

ProjectItem.propTypes = {
  themeColor: PropTypes.number.isRequired,
  alt: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  srcs: PropTypes.array.isRequired,
  header: PropTypes.string
};

export default ProjectItem;
