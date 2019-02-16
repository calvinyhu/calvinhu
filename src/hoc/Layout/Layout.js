import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import throttle from 'raf-throttle';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import styles from './Layout.module.scss';
import Button from '../../components/UI/Button/Button';
import NavItem from '../../components/UI/Button/NavItem/NavItem';
import Fa from '../../components/UI/Icon/Fa/Fa';
import Rf from '../../components/UI/Icon/Rf/Rf';
import Drawer from '../../components/UI/Drawer/Drawer';
import Backdrop from '../../components/UI/Backdrop/Backdrop';

class Layout extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
  };

  state = {
    isShowBackToTopButton: false,
    isDrawerOpen: false,
    percent: 0,
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

  handleDrawerOpen = () =>
    this.setState({
      isDrawerOpen: true,
      percent: 1,
    });

  handleDrawerClose = () =>
    this.setState({
      isDrawerOpen: false,
      percent: 0,
    });

  createNavLinks = () => (
    <React.Fragment>
      <NavItem to="/photo" clear click={this.handleDrawerClose}>
        Photography
      </NavItem>
      <NavItem to="/about" clear click={this.handleDrawerClose}>
        About
      </NavItem>
    </React.Fragment>
  );

  render() {
    const goBackToTopBtnClasses = classnames({
      [styles.BackToTopBtn]: true,
      [styles.OnScreenY]: this.state.isShowBackToTopButton,
    });

    const navClasses = classnames({
      [styles.Nav]: true,
      [styles.White]:
        this.state.isShowBackToTopButton ||
        this.props.location.pathname === '/photo',
    });

    const nameClasses = classnames({
      [styles.Name]: true,
      [styles.Opacity100]:
        this.state.isShowBackToTopButton ||
        this.props.location.pathname === '/photo',
    });

    const navLinks = this.createNavLinks();

    return (
      <div className={styles.Layout}>
        <div className={navClasses}>
          <div className={nameClasses}>
            <NavItem to="/" clear noActiveClass click={this.handleDrawerClose}>
              Calvin Hu
            </NavItem>
          </div>
          <div className={styles.NavLinksContainer}>
            <div className={styles.NavLinks}>{navLinks}</div>
            <div className={styles.DrawerToggle}>
              <Button circle clear click={this.handleDrawerOpen}>
                <Rf sm>menu</Rf>
              </Button>
            </div>
          </div>
        </div>

        <Drawer right isOpen={this.state.isDrawerOpen}>
          <div className={styles.NavDrawerLinks}>{navLinks}</div>
        </Drawer>
        <Backdrop
          isOpen={this.state.isDrawerOpen}
          click={this.handleDrawerClose}
          percent={this.state.percent}
        />

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

export default withRouter(Layout);
