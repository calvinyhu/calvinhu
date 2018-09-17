import React, { PureComponent } from 'react';

import classes from './Home.css';
import About from '../../components/About/About';
import Projects from '../../components/Projects/Projects';
import Photography from '../../components/Photography/Photography';
import Calisthenics from '../../components/Calisthenics/Calisthenics';

const throttle = require('lodash.throttle');

const SCROLL = {
  PROJECTS: 0.23,
  SHMACK: 0.3,
  PHOTO: 0.5,
  CALI: 0.8
};

class Home extends PureComponent {
  state = {
    isShowProjects: false,
    isShowShmack: false,
    isShowPhotography: false,
    isShowCalisthenics: false
  };

  handleScroll = event => {
    event.persist();
    this.throttleScroll(event.target.scrollTop, event.target.scrollHeight);
  };

  throttleScroll = throttle((scrollTop, scrollHeight) => {
    const percent = (scrollTop + window.innerHeight) / scrollHeight;
    if (!this.state.isShowProjects)
      this.setState({ isShowProjects: percent > SCROLL.PROJECTS });
    if (!this.state.isShowShmack)
      this.setState({ isShowShmack: percent > SCROLL.SHMACK });
    if (!this.state.isShowPhotography)
      this.setState({ isShowPhotography: percent > SCROLL.PHOTO });
    if (!this.state.isShowCalisthenics)
      this.setState({ isShowCalisthenics: percent > SCROLL.CALI });
  }, 200);

  render() {
    return (
      <div className={classes.Home} onScroll={this.handleScroll}>
        <About />
        <Projects
          isShowProjects={this.state.isShowProjects}
          isShowShmack={this.state.isShowShmack}
        />
        <Photography isShowPhotography={this.state.isShowPhotography} />
        <Calisthenics isShowCalisthenics={this.state.isShowCalisthenics} />
      </div>
    );
  }
}

export default Home;
