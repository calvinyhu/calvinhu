import React, { Component } from 'react';
import throttle from 'raf-throttle';

import classes from './Layout.css';
import Button from '../../components/UI/Button/Button';
import { MAT_ICONS } from '../../utils/styles';

class Layout extends Component {
  state = {
    isShowBackToTopButton: false
  };

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    throttle(this.animatePage(window.scrollY, window.innerHeight));
  };

  animatePage = (scrollTop, clientHeight) => {
    if (this.state.isShowBackToTopButton && scrollTop < clientHeight)
      this.setState({ isShowBackToTopButton: false });
    if (!this.state.isShowBackToTopButton && scrollTop >= clientHeight)
      this.setState({ isShowBackToTopButton: true });
  };

  handleScrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  render() {
    let goBackToTopBtnClasses = classes.BackToTopBtn;
    if (this.state.isShowBackToTopButton)
      goBackToTopBtnClasses += ' ' + classes.OnScreenY;

    return (
      <div className={classes.Layout}>
        {this.props.children}

        <div className={goBackToTopBtnClasses}>
          <Button circle adj click={this.handleScrollToTop}>
            <div className={MAT_ICONS}>arrow_upward</div>
          </Button>
        </div>
      </div>
    );
  }
}

export default Layout;
