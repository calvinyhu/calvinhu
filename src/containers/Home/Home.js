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

class Home extends PureComponent {
  constructor(props) {
    super(props);
    this.home = React.createRef();
  }

  state = {
    isShowBackToTopButton: false,
    page: 0
  };

  handleClick = page => {
    if (this.state.page !== page) this.setState({ page: page });
    else this.handleScrollToPage();
  };

  handleScroll = event => {
    throttle(
      this.animatePage(
        event.target.className,
        event.target.scrollTop,
        event.target.clientHeight
      )
    );
  };

  animatePage = (className, scrollTop, clientHeight) => {
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

  switchPage = newPage => {
    switch (newPage) {
      case PAGE.WEB:
        return <Projects scrollIntoView={this.handleScrollToPage} />;
      case PAGE.ABOUT:
        return <About scrollIntoView={this.handleScrollToPage} />;
      case PAGE.RESUME:
        return <Resume scrollIntoView={this.handleScrollToPage} />;
      default:
        return null;
    }
  };

  render() {
    let page = this.switchPage(this.state.page);

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
