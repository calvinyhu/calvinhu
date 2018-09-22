import React, { PureComponent } from 'react';
import throttle from 'raf-throttle';
// import { firestore } from '../../utils/firebase';

import classes from './Home.css';
import Cover from '../../components/Cover/Cover';
import Projects from '../../components/Projects/Projects';
import About from '../../components/About/About';
import Resume from '../../components/Resume/Resume';
import Button from '../../components/UI/Button/Button';
import STYLES from '../../utils/styles';

export const PAGE = {
  NONE: 0,
  WEB: 1,
  ABOUT: 2,
  RESUME: 3
};

const TIMELINE = {
  WEB: 25,
  ABOUT: 25,
  RESUME: 25,
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
    isAnimateAboutScroll: false,
    isAnimateResumeScroll: false,
    isShowBackToTopButton: false,
    page: 0,
    photos: null
  };

  componentDidMount() {
    // const photographyRef = firestore.collection('photography');
    // photographyRef
    //   .doc('photoUrls')
    //   .get()
    //   .then(doc => {
    //     if (doc.exists) this.setState({ photos: doc.data() });
    //   });
  }

  handleClick = page => {
    if (this.state.page !== page) {
      this.setState({
        page: page,
        isAnimateWebScroll: false,
        isAnimateAboutScroll: false,
        isAnimateResumeScroll: false,
        isAnimateShmackScroll: false
      });
    } else this.handleScrollToPage();
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
    if (!this.state.isAnimateAboutScroll)
      this.setState({ isAnimateAboutScroll: percent > TIMELINE.ABOUT });
    if (!this.state.isAnimateResumeScroll)
      this.setState({ isAnimateResumeScroll: percent > TIMELINE.RESUME });

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
      case PAGE.ABOUT:
        page = (
          <About
            scrollIntoView={this.handleScrollToPage}
            isAnimateAboutScroll={this.state.isAnimateAboutScroll}
            photos={this.state.photos}
          />
        );
        break;
      case PAGE.RESUME:
        page = (
          <Resume
            scrollIntoView={this.handleScrollToPage}
            isAnimateResumeScroll={this.state.isAnimateResumeScroll}
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
        <Cover click={this.handleClick} />
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
