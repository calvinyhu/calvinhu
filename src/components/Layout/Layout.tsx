import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Button from '../UI/Button/Button';
import NavItem from '../UI/NavItem/NavItem';
import Fa from '../UI/Fa/Fa';
import NavBar from '../NavBar/NavBar';
import NavDrawer from '../NavDrawer/NavDrawer';
import { hideNavOnPathname } from 'utils/styles';

import { LayoutProps } from './Layout.models';

import styles from './Layout.module.scss';
import { useScrollPositionFlag } from 'utils/hooks';

const Layout = ({ location: { pathname }, children }: LayoutProps) => {
  const [isShowToTop, setIsShowToTop] = useState(false);
  useScrollPositionFlag(isShowToTop, setIsShowToTop, window.innerHeight);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [percent, setPercent] = useState(0);

  const handleDrawerOpen = () => {
    setIsDrawerOpen(true);
    setPercent(1);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
    setPercent(0);
  };

  const navLinks = (
    <>
      {/*
      // @ts-ignore */}
      <NavItem to="/photo" noActiveClass clear click={handleDrawerClose}>
        Photography
      </NavItem>
      {/*
      // @ts-ignore */}
      <NavItem to="/order" noActiveClass clear click={handleDrawerClose}>
        Order Prints
      </NavItem>
      {/*
      // @ts-ignore */}
      <NavItem to="/about" noActiveClass clear click={handleDrawerClose}>
        About
      </NavItem>
    </>
  );

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0 });
    setIsShowToTop(false);
  };

  const renderBackToTopButton = () => {
    const goBackToTopBtnClasses = classnames({
      [styles.BackToTopBtn]: true,
      [styles.OnScreenY]: isShowToTop,
    });
    return (
      <div className={goBackToTopBtnClasses}>
        <Button circle blueGray ariaLabel="Go To Top" click={handleScrollToTop}>
          <Fa white>fas fa-arrow-up</Fa>
        </Button>
      </div>
    );
  };

  const layoutInnerClasses = classnames({
    [styles.LayoutInner]: true,
    [styles.PaddingTopZero]: hideNavOnPathname(pathname),
  });

  return (
    <div className={styles.Layout}>
      <NavBar
        isShowToTop={isShowToTop}
        handleDrawerClose={handleDrawerClose}
        handleDrawerOpen={handleDrawerOpen}
        navLinks={navLinks}
        pathname={pathname}
      />
      <NavDrawer
        handleDrawerClose={handleDrawerClose}
        isDrawerOpen={isDrawerOpen}
        navLinks={navLinks}
        percent={percent}
      />
      <div className={layoutInnerClasses}>{children}</div>
      {renderBackToTopButton()}
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.element.isRequired,
};

// eslint-disable-next-line
export default withRouter(Layout as any);
