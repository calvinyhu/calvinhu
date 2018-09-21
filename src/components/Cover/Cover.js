import React from 'react';

import classes from './Cover.css';
import { PAGE } from '../../containers/Home/Home';

const cover = props => {
  const clickWeb = () => props.click(PAGE.WEB);
  const clickAbout = () => props.click(PAGE.ABOUT);
  const clickResume = () => props.click(PAGE.RESUME);

  return (
    <div className={classes.Cover}>
      <div className={classes.Background} />

      <div className={classes.Blur} />

      <div className={classes.SocialMedia}>
        <h5>LinkedIn</h5>
        <h5>GitHub</h5>
      </div>

      <div className={classes.CoverText}>
        <div className={classes.Blurb}>
          <h1 className={classes.Name}>Hi, I'm Calvin</h1>
          <h2 className={classes.Title}>Web Developer</h2>
        </div>

        <div className={classes.Nav}>
          <h5 onClick={clickWeb}>Web Apps</h5>
          <h5 onClick={clickAbout}>About</h5>
          <h5 onClick={clickResume}>Resume</h5>
        </div>
      </div>
    </div>
  );
};

export default cover;
