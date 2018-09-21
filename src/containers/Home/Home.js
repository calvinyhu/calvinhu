import React, { PureComponent } from 'react';
import throttle from 'raf-throttle';
import { firestore } from '../../utils/firebase';

import classes from './Home.css';
import About from '../../components/About/About';
import Projects from '../../components/Projects/Projects';
import Photography from '../../components/Photography/Photography';
import Calisthenics from '../../components/Calisthenics/Calisthenics';
import Button from '../../components/UI/Button/Button';
import STYLES from '../../utils/styles';

export const PAGE = {
  NONE: 0,
  WEB: 1,
  PHOTO: 2,
  CALI: 3
};

const TIMELINE = {
  WEB: 25,
  PHOTO: 5,
  CALI: 25,
  SHMACK: 55
};

class Home extends PureComponent {
  constructor(props) {
    super(props);
    this.home = React.createRef();
  }

  state = {
    isAnimateWebScroll: false,
    isAnimateShmackScroll: false,
    isAnimatePhotoScroll: false,
    isAnimateCaliScroll: false,
    isShowBackToTopButton: false,
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
        isAnimateWebScroll: false,
        isAnimatePhotoScroll: false,
        isAnimateCaliScroll: false,
        isAnimateShmackScroll: false
      });
    }
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
    if (!this.state.isAnimateWebScroll)
      this.setState({ isAnimateWebScroll: percent > TIMELINE.WEB });
    if (!this.state.isAnimateShmackScroll)
      this.setState({ isAnimateShmackScroll: percent > TIMELINE.SHMACK });
    if (!this.state.isAnimatePhotoScroll)
      this.setState({ isAnimatePhotoScroll: percent > TIMELINE.PHOTO });
    if (!this.state.isAnimateCaliScroll)
      this.setState({ isAnimateCaliScroll: percent > TIMELINE.CALI });

    if (this.home.current.className === className) {
      if (this.state.isShowBackToTopButton && scrollTop < clientHeight)
        this.setState({ isShowBackToTopButton: false });
      if (!this.state.isShowBackToTopButton && scrollTop >= clientHeight)
        this.setState({ isShowBackToTopButton: true });
    }
  };

  handleScrollToTop = () => (this.home.current.scrollTop = 0);
  handleScrollToPage = () => {
    this.home.current.scrollTop = this.home.current.clientHeight;
  };

  render() {
    let page;
    switch (this.state.page) {
      case PAGE.WEB:
        page = (
          <Projects
            scrollIntoView={this.handleScrollToPage}
            isAnimateWebScroll={this.state.isAnimateWebScroll}
            isAnimateShmackScroll={this.state.isAnimateShmackScroll}
          />
        );
        break;
      case PAGE.PHOTO:
        page = (
          <Photography
            scrollIntoView={this.handleScrollToPage}
            isAnimatePhotoScroll={this.state.isAnimatePhotoScroll}
            photos={this.state.photos}
          />
        );
        break;
      case PAGE.CALI:
        page = (
          <Calisthenics
            scrollIntoView={this.handleScrollToPage}
            isAnimateCaliScroll={this.state.isAnimateCaliScroll}
          />
        );
        break;
      default:
        page = null;
    }

    let goBackToTopBtnClasses = classes.BackToTopBtn;
    if (this.state.isShowBackToTopButton)
      goBackToTopBtnClasses += ' ' + classes.OnScreenY;

    return (
      <div
        className={classes.Home}
        onScroll={this.handleScroll}
        ref={this.home}
      >
        <About click={this.handleClick} />
        {page}
        <div className={goBackToTopBtnClasses}>
          <Button circle opp click={this.handleScrollToTop}>
            <div className={STYLES.MAT_ICONS}>arrow_upward</div>
          </Button>
        </div>
      </div>
    );
  }
}

export default Home;
