import React, { PureComponent } from 'react';

import classes from './Projects.css';
import shmack1 from '../../assets/images/shmack1.png';

class Projects extends PureComponent {
  componentDidMount() {
    this.props.scrollIntoView();
  }

  render() {
    let shmackClasses = classes.ProjectItem + ' ' + classes.Hide;
    if (this.props.isAnimateShmackScroll)
      shmackClasses = classes.ProjectItem + ' ' + classes.BlockSlideFadeIn;

    let projectsClasses = classes.Projects + ' ' + classes.Hide;
    if (this.props.isAnimateWebScroll)
      projectsClasses = classes.Projects + ' ' + classes.BlockSlideFadeIn;

    return (
      <div className={projectsClasses}>
        <h4>Web Apps I've Built</h4>
        <div className={shmackClasses}>
          <p>
            Shmack is the wikipedia of restaurants, where users can view, add,
            and edit popular food items
          </p>
          <div className={classes.Carousel}>
            <div className={classes.CarouselItem}>
              <div className={classes.ImgContainer}>
                <img src={shmack1} alt="shmack" />
              </div>
              <div className={classes.Description}>
                <p>Get popular food items fast</p>
              </div>
            </div>
            <div className={classes.CarouselItem}>
              <div className={classes.ImgContainer}>
                <img src={shmack1} alt="shmack" />
              </div>
              <div className={classes.Description}>
                <p>Get popular food items fast</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Projects;
