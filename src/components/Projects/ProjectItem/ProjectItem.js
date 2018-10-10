import React from 'react';

import classes from './ProjectItem.css';
import { THEME_COLOR } from '../Projects';

const projectItem = props => {
  let colorSplashClassNames = classes.ColorSplash;

  switch (props.themeColor) {
    case THEME_COLOR.SHMACK:
      colorSplashClassNames += ' ' + classes.ShmackColorSplash;
      break;
    case THEME_COLOR.JAMMMING:
      colorSplashClassNames += ' ' + classes.JammmingColorSplash;
      break;
    default:
      break;
  }

  let carouselItems = [];

  props.srcs.forEach((src, index) => {
    carouselItems.push(
      <div key={index} className={classes.CarouselItem}>
        <div className={classes.ImgContainer}>
          <img src={src} alt={props.alt} />
        </div>
      </div>
    );
  });

  return (
    <div className={classes.ProjectItem}>
      <div className={colorSplashClassNames} />
      <div className={classes.ProjectContent}>
        <div className={classes.Description}>
          <p>{props.description}</p>
          <p>
            Check it out:{' '}
            <a href={props.href} target="_blank" rel="noopener noreferrer">
              {props.name}
            </a>
          </p>
        </div>
        <div className={classes.Carousel}>{carouselItems}</div>
      </div>
    </div>
  );
};

export default projectItem;
