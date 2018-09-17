import React, { PureComponent } from 'react';

import classes from './Home.css';

const SCROLL = {
  PROJECTS: 99,
  SHMACK: 200,
  PHOTO: 1300,
  CALI: 2600
};

class Home extends PureComponent {
  state = {
    isShowProjects: false,
    isShowShmack: false,
    isShowPhotography: false,
    isShowCalisthenics: false
  };

  handleScroll = event => {
    let scrollTop = event.target.scrollTop;
    console.log(scrollTop);
    if (!this.state.isShowProjects)
      this.setState({ isShowProjects: scrollTop > SCROLL.PROJECTS });
    if (!this.state.isShowShmack)
      this.setState({ isShowShmack: scrollTop > SCROLL.SHMACK });
    if (!this.state.isShowPhotography)
      this.setState({ isShowPhotography: scrollTop > SCROLL.PHOTO });
    if (!this.state.isShowCalisthenics)
      this.setState({ isShowCalisthenics: scrollTop > SCROLL.CALI });
  };

  render() {
    let shmackClasses = classes.Project + ' ' + classes.Hide;
    if (this.state.isShowShmack)
      shmackClasses = classes.Project + ' ' + classes.BlockSlideFadeIn;

    let projectsClasses = classes.Projects + ' ' + classes.Hide;
    if (this.state.isShowProjects)
      projectsClasses = classes.Projects + ' ' + classes.BlockSlideFadeIn;

    let photographyClasses = classes.Photography + ' ' + classes.Hide;
    if (this.state.isShowPhotography)
      photographyClasses = classes.Photography + ' ' + classes.BlockSlideFadeIn;

    let caliClasses = classes.Calisthenics + ' ' + classes.Hide;
    if (this.state.isShowCalisthenics)
      caliClasses = classes.Calisthenics + ' ' + classes.BlockSlideFadeIn;

    return (
      <div className={classes.Home} onScroll={this.handleScroll}>
        <div className={classes.About}>
          <h1 className={classes.Title + ' ' + classes.Hide}>
            Hi, I'm Calvin.
          </h1>
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

        <div className={projectsClasses}>
          <h4>My Projects</h4>
          <div className={shmackClasses} />
        </div>

        <div className={photographyClasses}>
          <h4>My Photos</h4>
          <div className={classes.Gallery}>Gallery</div>
        </div>

        <div className={caliClasses}>
          <h4>My Health</h4>
        </div>
      </div>
    );
  }
}

export default Home;
