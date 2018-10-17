import React, { PureComponent } from 'react';
import Fade from 'react-reveal/Fade';

import classes from './Projects.css';
import ProjectItem from './ProjectItem/ProjectItem';
import shmack_res from '../../assets/images/shmack_res.png';
import shmack_home from '../../assets/images/shmack_home.png';
import jammming_search from '../../assets/images/jammming_search.png';
import jammming_playlist from '../../assets/images/jammming_playlist.png';

export const THEME_COLOR = {
  SHMACK: 1,
  JAMMMING: 2
};

class Projects extends PureComponent {
  componentDidMount() {
    if (this.props.isClicked) this.props.scrollIntoView();
  }

  render() {
    const shmackSrcs = [shmack_home, shmack_res];
    let shmack = (
      <ProjectItem
        href="https://shmack.app"
        name="shmack.app"
        header="My Web Apps"
        description="Shmack is a platform where users can view, add, and vote on popular menu
      items at restaurants. This app aims to be fast, simple, and intuitive for finding quick
      eats."
        srcs={shmackSrcs}
        themeColor={THEME_COLOR.SHMACK}
      />
    );

    const jammmingSrcs = [jammming_search, jammming_playlist];
    let jammming = (
      <ProjectItem
        href="https://jammmingspotify.firebaseapp.com/"
        name="jammming"
        description="Jammming allows users to search songs, create a playlist, and add it to
      their Spotify account."
        srcs={jammmingSrcs}
        themeColor={THEME_COLOR.JAMMMING}
      />
    );

    return (
      <Fade>
        <div className={classes.Projects}>
          {shmack}
          {jammming}
        </div>
      </Fade>
    );
  }
}

export default Projects;
