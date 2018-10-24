import React, { Component } from 'react';
import Reveal from 'react-reveal/Reveal';

import classes from './ProjectItem.module.scss';

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
    let colorSplashClassNames = classes.ColorSplash;

    switch (this.props.themeColor) {
      case 1:
        colorSplashClassNames += ' ' + classes.ShmackColorSplash;
        break;
      case 2:
        colorSplashClassNames += ' ' + classes.JammmingColorSplash;
        break;
      default:
        break;
    }

    let carouselItems = [];

    if (this.props.srcs.length > 0) {
      this.props.srcs.forEach((src, index) => {
        let carouselItemClasses = classes.CarouselItem + ' ' + classes.Hide;
        if (this.state.isLoaded[src]) carouselItemClasses += ' ' + classes.Show;

        carouselItems.push(
          <div key={index} className={carouselItemClasses}>
            <div className={classes.ImgContainer}>
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
        <div key={1} className={classes.LoaderContainer}>
          <div className={classes.Loader} />
        </div>
      );
    }

    let header = null;
    if (this.props.header) header = <h3>{this.props.header}</h3>;

    return (
      <div className={classes.ProjectItem}>
        <div className={classes.ProjectContent}>
          <div className={colorSplashClassNames} />
          <div className={classes.Description}>
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
          <Reveal effect={classes.BlockSlideFadeIn}>
            <div className={classes.Carousel}>{carouselItems}</div>
          </Reveal>
        </div>
      </div>
    );
  }
}

export default ProjectItem;
