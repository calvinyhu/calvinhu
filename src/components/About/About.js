import React from 'react';

import classes from './About.css';
import { PAGE } from '../../containers/Home/Home';

const about = props => {
  const clickWeb = () => props.click(PAGE.WEB);
  const clickPhoto = () => props.click(PAGE.PHOTO);
  const clickCali = () => props.click(PAGE.CALI);

  return (
    <div
      style={{ opacity: props.blurbTitlesOpacity }}
      className={classes.About}
    >
      <h1 className={classes.Title + ' ' + classes.Hide}>Hi, I'm Calvin.</h1>
      <div className={classes.Blurb}>
        <div className={classes.BlurbEnds}>
          <p className={classes.BlurbBegin + ' ' + classes.Hide}>I'm a</p>
          <p className={classes.BlurbEnd + ' ' + classes.Hide}>and</p>
        </div>
        <div className={classes.BlurbTitles}>
          <div className={classes.BlurbTitle1 + ' ' + classes.Hide}>
            <p onClick={clickWeb}>Web Apps</p>
            <p>Developer</p>
          </div>
          <div className={classes.BlurbTitle2 + ' ' + classes.Hide}>
            <p onClick={clickPhoto}>Photography</p>
            <p>Enthusiast</p>
          </div>
          <div className={classes.BlurbTitle3 + ' ' + classes.Hide}>
            <p onClick={clickCali}>Calisthenics</p>
            <p>Aficionado</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default about;
