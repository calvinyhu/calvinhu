import React, { PureComponent } from 'react';
import throttle from 'raf-throttle';
import { firestore } from '../../utils/firebase';

import classes from './Home.css';
import About from '../../components/About/About';
import Projects from '../../components/Projects/Projects';
import Photography from '../../components/Photography/Photography';
import Calisthenics from '../../components/Calisthenics/Calisthenics';
import Button from '../../components/UI/Button/Button';

export const PAGE = {
  NONE: 0,
  WEB: 1,
  PHOTO: 2,
  CALI: 3
};

// TODO:
// Timeline percentages need to be different for different pages
// They can be hard-coded, but if content changes then the values need to be changed
const TIMELINE = {
  PAGE: 25,
  SHMACK: 55
};

class Home extends PureComponent {
  constructor(props) {
    super(props);
    this.home = React.createRef();
  }

  state = {
    isAnimatePageScroll: false,
    isAnimateShmackScroll: false,
    isShowBackToTopButton: false,
    blurbTitlesOpacity: 1,
    page: 0,
    photos: null
  };

  componentDidMount() {
    const photographyRef = firestore.collection('photography');
    photographyRef
      .doc('photoUrls')
      .get()
      .then(doc => {
        if (doc.exists) this.setState({ photos: doc.data() });
      });
  }

  handleClick = page => {
    if (this.state.page !== page) {
      this.setState({
        page: page,
        isAnimatePageScroll: false,
        isAnimateShmackScroll: false
      });
    }
    // FIXME:
    // Bug when clicking calisthenics first, then photography
    this.home.current.scrollTop = this.home.current.clientHeight;
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

  handleGoBackToTop = () => (this.home.current.scrollTop = 0);

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
          <Photography
            isAnimatePageScroll={this.state.isAnimatePageScroll}
            photos={this.state.photos}
          />
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
      goBackToTopBtnClasses += ' ' + classes.OnScreenY;

    return (
      <div className={homeClasses} onScroll={this.handleScroll} ref={this.home}>
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
