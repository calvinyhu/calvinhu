import React from 'react';

import classes from './Projects.css';
import shmack1 from '../../assets/images/shmack1.png';

const projects = props => {
  let shmackClasses = classes.ProjectItem + ' ' + classes.Hide;
  if (props.isShowShmack)
    shmackClasses = classes.ProjectItem + ' ' + classes.BlockSlideFadeIn;

  let projectsClasses = classes.Projects + ' ' + classes.Hide;
  if (props.isShowProjects)
    projectsClasses = classes.Projects + ' ' + classes.BlockSlideFadeIn;

  return (
    <div className={projectsClasses}>
      <h4>My Projects</h4>
      <div className={shmackClasses}>
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
};

export default projects;
