import React, { PureComponent } from 'react';
import throttle from 'raf-throttle';

import classes from './Home.css';
import Cover from '../../components/Cover/Cover';
import Projects from '../../components/Projects/Projects';
import About from '../../components/About/About';
import Resume from '../../components/Resume/Resume';
import Button from '../../components/UI/Button/Button';
import { MAT_ICONS } from '../../utils/styles';

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
    page: 1,
    offsetX: 0
  };

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleClick = page => {
    if (this.state.page !== page) this.setState({ page: page });
    else this.handleScrollToPage();
  };

  handleScroll = () => {
    throttle(this.animatePage(window.scrollY, window.innerHeight));
  };

  animatePage = (scrollTop, clientHeight) => {
    if (this.state.isShowBackToTopButton && scrollTop < clientHeight)
      this.setState({ isShowBackToTopButton: false });
    if (!this.state.isShowBackToTopButton && scrollTop >= clientHeight)
      this.setState({ isShowBackToTopButton: true });
    if (scrollTop < clientHeight) this.setState({ offsetX: -scrollTop / 10 });
  };

  handleScrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  handleScrollToPage = () => {
    if (this.home.current) {
      window.scrollTo({
        top: this.home.current.clientHeight,
        behavior: 'smooth'
      });
    }
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
        <Cover click={this.handleClick} offsetX={this.state.offsetX} />
        {page}
        <div className={goBackToTopBtnClasses}>
          <Button circle adj click={this.handleScrollToTop}>
            <div className={MAT_ICONS}>arrow_upward</div>
          </Button>
        </div>
      </div>
    );
  }
}

export default Home;
