import React, { PureComponent } from 'react';
import throttle from 'raf-throttle';

import classes from './Home.css';
import About from '../../components/About/About';
import Projects from '../../components/Projects/Projects';
import Photography from '../../components/Photography/Photography';
import Calisthenics from '../../components/Calisthenics/Calisthenics';
import Button from '../../components/UI/Button/Button';

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

// TODO:
// Make scroll back to top smooth
// FIXME:
// Adding scroll-behavior: smooth to .Home breaks wheel scrolling
let homeTarget = null;

class Home extends PureComponent {
  state = {
    isAnimatePageScroll: false,
    isAnimateShmackScroll: false,
    isShowBackToTopButton: false,
    blurbTitlesOpacity: 1,
    page: 0
  };

  componentDidUpdate() {
    console.log('componentDidUpdate');
  }

  handleClick = page => {
    if (this.state.page !== page)
      this.setState({
        page: page,
        isAnimatePageScroll: false,
        isAnimateShmackScroll: false
      });
  };

  handleScroll = event => {
    if (!homeTarget) homeTarget = event.target;
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
      if (scrollTop <= clientHeight) {
        this.setState({
          blurbTitlesOpacity: Math.max(1 - scrollTop / clientHeight, 0)
        });
      }
      if (this.state.isShowBackToTopButton && scrollTop <= clientHeight)
        this.setState({ isShowBackToTopButton: false });
      if (!this.state.isShowBackToTopButton && scrollTop > clientHeight)
        this.setState({ isShowBackToTopButton: true });
    }
  };

  handleGoBackToTop = () => {
    homeTarget.scrollTop = 0;
  };

  render() {
    console.log('Rendering');
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

    let goBackToTopBtnClasses = classes.BackToTopBtn;
    if (this.state.isShowBackToTopButton)
      goBackToTopBtnClasses +=
        ' ' + classes.OnScreenY + ' ' + classes.FabSlideFadeIn;

    return (
      <div className={homeClasses} onScroll={this.handleScroll}>
        <About
          click={this.handleClick}
          blurbTitlesOpacity={this.state.blurbTitlesOpacity}
        />
        {page}
        <div className={goBackToTopBtnClasses}>
          <Button circle opp click={this.handleGoBackToTop}>
            <div className="material-icons">arrow_upward</div>
          </Button>
        </div>
      </div>
    );
  }
}

export default Home;
