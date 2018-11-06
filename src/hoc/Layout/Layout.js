import React, { Component } from 'react';
import throttle from 'raf-throttle';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import styles from './Layout.module.scss';
import Button from '../../components/UI/Button/Button';
import Fa from '../../components/UI/Icon/Fa/Fa';

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
    const goBackToTopBtnClasses = classnames({
      [styles.BackToTopBtn]: true,
      [styles.OnScreenY]: this.state.isShowBackToTopButton
    });

    return (
      <div className={styles.Layout}>
        {this.props.children}

        <div className={goBackToTopBtnClasses}>
          <Button circle adj click={this.handleScrollToTop}>
            <Fa lg>fas fa-arrow-up</Fa>
          </Button>
        </div>
      </div>
    );
  }
}

Layout.propTypes = {
  children: PropTypes.element.isRequired
};

export default Layout;
