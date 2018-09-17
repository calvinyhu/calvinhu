import React, { PureComponent } from 'react';

import classes from './Home.css';

const SCROLL = {
  PROJECTS: 99,
  SHMACK: 200
};

class Home extends PureComponent {
  state = {
    isShowProjects: false,
    isShowShmack: false
  };

  handleScroll = event => {
    let scrollTop = event.target.scrollTop;

    if (!this.state.isShowProjects)
      this.setState({ isShowProjects: scrollTop > SCROLL.PROJECTS });
    if (!this.state.isShowShmack)
      this.setState({ isShowShmack: scrollTop > SCROLL.SHMACK });
  };

  render() {
    let shmackClasses = classes.Project + ' ' + classes.Hide;
    if (this.state.isShowShmack)
      shmackClasses = classes.Project + ' ' + classes.BlockSlideFadeIn;

    let projectsClasses = classes.Projects + ' ' + classes.Hide;
    if (this.state.isShowProjects)
      projectsClasses = classes.Projects + ' ' + classes.BlockSlideFadeIn;

    return (
      <div className={classes.Home} onScroll={this.handleScroll}>
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

        <div className={projectsClasses}>
          <h1>My Projects</h1>
          <div className={shmackClasses} />
        </div>

        <div className={classes.Photography}>
          <h1>My Photos</h1>
        </div>

        <div className={classes.Calisthenics}>
          <h1>My Health</h1>
        </div>
      </div>
    );
  }
}

export default Home;
