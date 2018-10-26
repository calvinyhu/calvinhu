import React, { PureComponent } from 'react';
import throttle from 'raf-throttle';

import styles from './Home.module.scss';
import Cover from '../../components/Cover/Cover';
import Projects from '../../components/Projects/Projects';
import AsyncComponent from '../../hoc/AsyncComponent/AsyncComponent';
const About = AsyncComponent(() => import('../../components/About/About'));
const Resume = AsyncComponent(() => import('../../components/Resume/Resume'));

export const PAGE = {
  NONE: 0,
  WEB: 1,
  ABOUT: 2,
  RESUME: 3
};

class Home extends PureComponent {
  constructor(props) {
    super(props);
    this.homeRef = React.createRef();
  }

  state = {
    isClicked: false,
    page: PAGE.WEB,
    offsetX: 0
  };

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleClick = page => {
    if (!this.state.isClicked) this.setState({ isClicked: true });

    if (this.state.page !== page) this.setState({ page: page });
    else this.handleScrollToPage();
  };

  handleScroll = () => {
    throttle(this.animatePage(window.scrollY, window.innerHeight));
  };

  animatePage = (scrollTop, clientHeight) => {
    if (scrollTop < clientHeight) this.setState({ offsetX: -scrollTop / 10 });
  };

  handleScrollToPage = () => {
    if (this.homeRef.current) {
      window.scrollTo({
        top: this.homeRef.current.clientHeight,
        behavior: 'smooth'
      });
    }
  };

  switchPage = newPage => {
    switch (newPage) {
      case PAGE.WEB:
        return (
          <Projects
            scrollIntoView={this.handleScrollToPage}
            isClicked={this.state.isClicked}
          />
        );
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

    return (
      <div
        className={styles.Home}
        onScroll={this.handleScroll}
        ref={this.homeRef}
      >
        <Cover click={this.handleClick} offsetX={this.state.offsetX} />
        {page}
      </div>
    );
  }
}

export default Home;
