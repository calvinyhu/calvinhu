import React from 'react';

import classes from './About.css';
import { PAGE } from '../../containers/Home/Home';

const about = props => {
  const clickWeb = () => props.click(PAGE.WEB);
  const clickPhoto = () => props.click(PAGE.PHOTO);
  const clickCali = () => props.click(PAGE.CALI);

  return (
    <div className={classes.About}>
      <div className={classes.Background} />

      <div className={classes.Blur} />

      <div className={classes.AboutText}>
        <h1 className={classes.Title}>Hi, I'm Calvin.</h1>
        <div className={classes.Blurb}>
          <div className={classes.BlurbEnds}>
            <p className={classes.BlurbBegin}>I'm a</p>
            <p className={classes.BlurbEnd}>and</p>
          </div>
          <div className={classes.BlurbTitles}>
            <div className={classes.BlurbTitle1}>
              <p onClick={clickWeb}>Web Apps</p>
              <p>Developer</p>
            </div>
            <div className={classes.BlurbTitle2}>
              <p onClick={clickPhoto}>Photography</p>
              <p>Enthusiast</p>
            </div>
            <div className={classes.BlurbTitle3}>
              <p onClick={clickCali}>Calisthenics</p>
              <p>Aficionado</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default about;
