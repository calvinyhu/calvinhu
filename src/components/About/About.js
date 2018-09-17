import React from 'react';

import classes from './About.css';

const about = () => {
  return (
    <div className={classes.About}>
      <h1 className={classes.Title + ' ' + classes.Hide}>Hi, I'm Calvin.</h1>
      <div className={classes.Blurb}>
        <div className={classes.BlurbEnds}>
          <p className={classes.BlurbBegin + ' ' + classes.Hide}>I'm a</p>
          <p className={classes.BlurbEnd + ' ' + classes.Hide}>and</p>
        </div>
        <div className={classes.BlurbTitles}>
          <p className={classes.BlurbTitle1 + ' ' + classes.Hide}>
            Web Developer
          </p>
          <p className={classes.BlurbTitle2 + ' ' + classes.Hide}>
            Photography Enthusiast
          </p>
          <p className={classes.BlurbTitle3 + ' ' + classes.Hide}>
            Calisthenics Aficionado
          </p>
        </div>
      </div>
    </div>
  );
};

export default about;
