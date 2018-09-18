import React, { PureComponent } from 'react';
import throttle from 'raf-throttle';

import classes from './Home.css';
import About from '../../components/About/About';
import Projects from '../../components/Projects/Projects';
import Photography from '../../components/Photography/Photography';
import Calisthenics from '../../components/Calisthenics/Calisthenics';

const TIMELINE = {
  PROJECTS: 5,
  SHMACK: 15,
  PHOTO: 40,
  CALI: 75
};

class Home extends PureComponent {
  state = {
    isShowProjects: false,
    isShowShmack: false,
    isShowPhotography: false,
    isShowCalisthenics: false
  };

  handleScroll = event => {
    throttle(
      this.animateTimeline(event.target.scrollTop, event.target.scrollHeight)
    );
  };

  animateTimeline = (scrollTop, scrollHeight) => {
    const percent = (scrollTop / (scrollHeight - window.innerHeight)) * 100;
    if (!this.state.isShowProjects)
      this.setState({ isShowProjects: percent > TIMELINE.PROJECTS });
    if (!this.state.isShowShmack)
      this.setState({ isShowShmack: percent > TIMELINE.SHMACK });
    if (!this.state.isShowPhotography)
      this.setState({ isShowPhotography: percent > TIMELINE.PHOTO });
    if (!this.state.isShowCalisthenics)
      this.setState({ isShowCalisthenics: percent > TIMELINE.CALI });
  };

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
