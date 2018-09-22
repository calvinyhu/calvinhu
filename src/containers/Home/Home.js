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
  WEB: 85,
  SHMACK: 85,
  ABOUT: 50,
  WHO: 50,
  OBJ: 70,
  CONSIDER: 80,
  PASSIONS: 90,
  CONTACT: 95,
  RESUME: 90
};

class Home extends PureComponent {
  constructor(props) {
    super(props);
    this.home = React.createRef();
  }

  state = {
    isAnimateWeb: false,
    isAnimateShmack: false,
    isAnimateAbout: false,
    isAnimateWho: false,
    isAnimateObj: false,
    isAnimateConsider: false,
    isAnimatePassions: false,
    isAnimateContact: false,
    isAnimateResume: false,
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
        isAnimateWeb: false,
        isAnimateShmack: false,
        isAnimateAbout: false,
        isAnimateWho: false,
        isAnimateObj: false,
        isAnimateConsider: false,
        isAnimatePassions: false,
        isAnimateContact: false,
        isAnimateResume: false
      });
    } else this.handleScrollToPage();
  };

  handleScroll = event => {
    throttle(
      this.animatePage(
        event.target.className,
        event.target.scrollTop,
        event.target.scrollHeight,
        event.target.clientHeight
      )
    );
  };

  animatePage = (className, scrollTop, scrollHeight, clientHeight) => {
    const percent = (scrollTop / (scrollHeight - window.innerHeight)) * 100;
    console.log(percent);
    if (!this.state.isAnimateWeb)
      this.setState({ isAnimateWeb: percent > TIMELINE.WEB });
    if (!this.state.isAnimateShmack)
      this.setState({ isAnimateShmack: percent > TIMELINE.SHMACK });
    if (!this.state.isAnimateAbout)
      this.setState({ isAnimateAbout: percent > TIMELINE.ABOUT });
    if (!this.state.isAnimateWho)
      this.setState({ isAnimateWho: percent > TIMELINE.WHO });
    if (!this.state.isAnimateObj)
      this.setState({ isAnimateObj: percent > TIMELINE.OBJ });
    if (!this.state.isAnimateConsider)
      this.setState({ isAnimateConsider: percent > TIMELINE.CONSIDER });
    if (!this.state.isAnimatePassions)
      this.setState({ isAnimatePassions: percent > TIMELINE.PASSIONS });
    if (!this.state.isAnimateContact)
      this.setState({ isAnimateContact: percent > TIMELINE.CONTACT });
    if (!this.state.isAnimateResume)
      this.setState({ isAnimateResume: percent > TIMELINE.RESUME });

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
            isAnimateWeb={this.state.isAnimateWeb}
            isAnimateShmack={this.state.isAnimateShmack}
          />
        );
        break;
      case PAGE.ABOUT:
        page = (
          <About
            scrollIntoView={this.handleScrollToPage}
            isAnimateAbout={this.state.isAnimateAbout}
            isAnimateWho={this.state.isAnimateWho}
            isAnimateObj={this.state.isAnimateObj}
            isAnimateConsider={this.state.isAnimateConsider}
            isAnimatePassions={this.state.isAnimatePassions}
            isAnimateContact={this.state.isAnimateContact}
            photos={this.state.photos}
          />
        );
        break;
      case PAGE.RESUME:
        page = (
          <Resume
            scrollIntoView={this.handleScrollToPage}
            isAnimateResume={this.state.isAnimateResume}
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
          <Button circle adj click={this.handleScrollToTop}>
            <div className={STYLES.MAT_ICONS}>arrow_upward</div>
          </Button>
        </div>
      </div>
    );
  }
}

export default Home;
