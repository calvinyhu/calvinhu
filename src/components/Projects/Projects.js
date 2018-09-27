import React, { PureComponent } from 'react';
import Reveal from 'react-reveal/Reveal';

import classes from './Projects.css';
import shmack1 from '../../assets/images/shmack1.png';

class Projects extends PureComponent {
  componentDidMount() {
    this.props.scrollIntoView();
  }

  render() {
    let shmack = (
      <div className={classes.ProjectItem}>
        <div className={classes.ColorSplash} />
        <div className={classes.ProjectContent}>
          <p>
            Shmack is a platform where users can view, add, and vote on popular
            menu items at restaurants. This app aims to be fast, simple, and
            intuitive for finding quick eats.
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

    return (
      <Reveal effect={classes.BlockSlideFadeIn}>
        <div className={classes.Projects}>
          <h3>Web Apps I've Built</h3>
          {shmack}
        </div>
      </Reveal>
    );
  }
}

export default Projects;
