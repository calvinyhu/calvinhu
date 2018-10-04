import React, { PureComponent } from 'react';
import Reveal from 'react-reveal/Reveal';

import classes from './Projects.css';
import shmack_res from '../../assets/images/shmack_res.png';
import shmack_home from '../../assets/images/shmack_home.png';

class Projects extends PureComponent {
  componentDidMount() {
    this.props.scrollIntoView();
  }

  render() {
    let shmack = (
      <div className={classes.ProjectItem}>
        <div className={classes.ColorSplash} />
        <div className={classes.ProjectContent}>
          <div>
            <p>
              <a
                className={classes.ImgContainer}
                href="https://shmack.app"
                target="_blank"
                rel="noopener noreferrer"
              >
                Shmack
              </a>{' '}
              is a platform where users can view, add, and vote on popular menu
              items at restaurants.
            </p>
            <p>
              This app aims to be fast, simple, and intuitive for finding quick
              eats.
            </p>
          </div>
          <div className={classes.Carousel}>
            <div className={classes.CarouselItem}>
              <div className={classes.ImgContainer}>
                <img src={shmack_home} alt="shmack_home" />
              </div>
            </div>
            <div className={classes.CarouselItem}>
              <div className={classes.ImgContainer}>
                <img src={shmack_res} alt="shmack_res" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );

    return (
      <Reveal effect={classes.BlockSlideFadeIn}>
        <div className={classes.Projects}>
          <h3>Web Apps I'm Building</h3>
          {shmack}
        </div>
      </Reveal>
    );
  }
}

export default Projects;
