import React, { PureComponent } from 'react';
import throttle from 'raf-throttle';

import classes from './Home.css';
import About from '../../components/About/About';
import Projects from '../../components/Projects/Projects';
import Photography from '../../components/Photography/Photography';
import Calisthenics from '../../components/Calisthenics/Calisthenics';

const PAGE = {
  NONE: 0,
  WEB: 1,
  PHOTO: 2,
  CALI: 3
};

const TIMELINE = {
  PAGE: 25,
  SHMACK: 55
};

class Home extends PureComponent {
  state = {
    isAnimatePageScroll: false,
    isAnimateShmackScroll: false,
    blurbTitlesOpacity: 1,
    page: 0
  };

  handleClick = page => {
    if (this.state.page !== page)
      this.setState({
        page: page,
        isAnimatePageScroll: false,
        isAnimateShmackScroll: false
      });
  };

  handleScroll = event => {
    throttle(
      this.animateTimeline(
        event.target.className,
        event.target.scrollTop,
        event.target.scrollHeight,
        event.target.clientHeight
      )
    );
  };

  animateTimeline = (className, scrollTop, scrollHeight, clientHeight) => {
    const percent = (scrollTop / (scrollHeight - window.innerHeight)) * 100;
    // console.log(className, scrollTop, scrollHeight, clientHeight, percent);
    if (!this.state.isAnimatePageScroll)
      this.setState({ isAnimatePageScroll: percent > TIMELINE.PAGE });
    if (!this.state.isAnimateShmackScroll)
      this.setState({ isAnimateShmackScroll: percent > TIMELINE.SHMACK });
    if (className.includes('Home')) {
      if (scrollTop > 0 && scrollTop <= clientHeight)
        this.setState({
          blurbTitlesOpacity: Math.max(1 - (scrollTop / clientHeight) * 2, 0)
        });
      if (scrollTop === 0) this.setState({ blurbTitlesOpacity: 1 });
    }
  };

  render() {
    let page;
    switch (this.state.page) {
      case PAGE.WEB:
        page = (
          <Projects
            isAnimatePageScroll={this.state.isAnimatePageScroll}
            isAnimateShmackScroll={this.state.isAnimateShmackScroll}
          />
        );
        break;
      case PAGE.PHOTO:
        page = (
          <Photography isAnimatePageScroll={this.state.isAnimatePageScroll} />
        );
        break;
      case PAGE.CALI:
        page = (
          <Calisthenics isAnimatePageScroll={this.state.isAnimatePageScroll} />
        );
        break;
      default:
        page = null;
    }

    let homeClasses = classes.Home;
    if (this.state.page) homeClasses += ' ' + classes.Scroll;

    return (
      <div className={homeClasses} onScroll={this.handleScroll}>
        <About
          click={this.handleClick}
          blurbTitlesOpacity={this.state.blurbTitlesOpacity}
        />
        {page}
      </div>
    );
  }
}

export default Home;
