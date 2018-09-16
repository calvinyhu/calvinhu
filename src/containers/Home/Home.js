import React, { Component } from 'react';

import classes from './Home.css';

class Home extends Component {
  render() {
    return (
      <div className={classes.Home}>
        <div className={classes.About}>
          <h1 className={classes.Title + ' ' + classes.Hide}>
            Hi, I'm Calvin.
          </h1>
          <div className={classes.Blurb}>
            <p className={classes.BlurbBegin + ' ' + classes.Hide}>I'm a</p>
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

        <div className={classes.Projects}>Projects</div>

        <div className={classes.Photography}>Photography</div>

        <div className={classes.Calisthenics}>Calisthenics</div>
      </div>
    );
  }
}

export default Home;
