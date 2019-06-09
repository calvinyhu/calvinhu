import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import throttle from 'raf-throttle';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Button from '../UI/Button/Button';
import NavItem from '../UI/Button/NavItem/NavItem';
import Fa from '../UI/Icon/Fa/Fa';
import NavBar from '../NavBar/NavBar';
import NavDrawer from '../NavDrawer/NavDrawer';

import styles from './Layout.module.scss';

const Layout = ({ location: { pathname }, children }) => {
  const [isBackToTopButtonClicked, setIsBackToTopButtonClicked] = useState(
    false,
  );
  const [isShowBackToTopButton, setIsShowBackToTopButton] = useState(false);
  useEffect(() => {
    const animatePage = (scrollTop, clientHeight) => {
      if (isShowBackToTopButton && scrollTop < clientHeight) {
        setIsShowBackToTopButton(false);
        setIsBackToTopButtonClicked(false);
      }
      if (!isShowBackToTopButton && scrollTop >= clientHeight)
        setIsShowBackToTopButton(true);
    };

    const handleScroll = () => {
      throttle(animatePage(window.scrollY, window.innerHeight));
    };

    const event = 'scroll';
    window.addEventListener(event, handleScroll);

    return () => {
      window.removeEventListener(event, handleScroll);
    };
  });

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [percent, setPercent] = useState(0);

  const drawerToggles = {};
  const getDrawerToggle = isOpen => {
    if (drawerToggles[isOpen]) return drawerToggles[isOpen];
    drawerToggles[isOpen] = () => {
      setIsDrawerOpen(isOpen);
      setPercent(isOpen ? 1 : 0);
    };
    return drawerToggles[isOpen];
  };

  const navLinks = (
    <React.Fragment>
      <NavItem to="/photo" noActiveClass clear click={getDrawerToggle(false)}>
        Photography
      </NavItem>
      <NavItem to="/about" noActiveClass clear click={getDrawerToggle(false)}>
        About
      </NavItem>
    </React.Fragment>
  );

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0 });
    setIsBackToTopButtonClicked(true);
  };

  const renderBackToTopButton = () => {
    const goBackToTopBtnClasses = classnames({
      [styles.BackToTopBtn]: true,
      [styles.OnScreenY]: isShowBackToTopButton && !isBackToTopButtonClicked,
    });
    return (
      <div className={goBackToTopBtnClasses}>
        <Button circle blueGray click={handleScrollToTop}>
          <Fa white lg>
            fas fa-arrow-up
          </Fa>
        </Button>
      </div>
    );
  };

  return (
    <div className={styles.Layout}>
      <NavBar
        isBackToTopButtonClicked={isBackToTopButtonClicked}
        isShowBackToTopButton={isShowBackToTopButton}
        handleDrawerClose={getDrawerToggle(false)}
        handleDrawerOpen={getDrawerToggle(true)}
        navLinks={navLinks}
        pathname={pathname}
      />
      <NavDrawer
        handleDrawerClose={getDrawerToggle(false)}
        isDrawerOpen={isDrawerOpen}
        navLinks={navLinks}
        percent={percent}
      />
      <div className={styles.LayoutInner}>{children}</div>
      {renderBackToTopButton()}
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.element.isRequired,
};

export default withRouter(Layout);
