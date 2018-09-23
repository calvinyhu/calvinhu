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
        <p>
          Shmack is the wikipedia of restaurants, where users can view, add, and
          edit popular food items
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
    );

    return (
      <Reveal effect={classes.BlockSlideFadeIn}>
        <div className={classes.Projects}>
          <h4>Web Apps I've Developed</h4>
          {shmack}
        </div>
      </Reveal>
    );
  }
}

export default Projects;
