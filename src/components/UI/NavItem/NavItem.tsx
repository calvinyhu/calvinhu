import React, { useState } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import classnames from 'classnames';

import styles from './NavItem.module.scss';

interface NavItemProps {
  bold?: boolean;
  borderMain?: boolean;
  clear?: boolean;
  // eslint-disable-next-line
  click: any;
  // eslint-disable-next-line
  children?: any;
  link?: boolean;
  noActiveClass: boolean;
  tall?: boolean;
  to: string;
}

const NavItem = ({
  bold = false,
  borderMain = false,
  clear = false,
  click,
  children = undefined,
  link = false,
  noActiveClass = false,
  tall = false,
  to,
}: NavItemProps) => {
  const [isMouse, setIsMouse] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const [rect, setRect] = useState({ top: 0, bot: 0, left: 0, right: 0 });

  const handleMouseEnter = () => setIsMouse(true);
  const handleMouseLeave = () => setIsMouse(false);

  // eslint-disable-next-line
  const handleTouchStart = (event: React.TouchEvent<any>) => {
    const nextRect = (event.target as Element).getBoundingClientRect();
    setRect({
      top: nextRect.top,
      bot: nextRect.bottom,
      left: nextRect.left,
      right: nextRect.right,
    });
    setIsTouch(true);
  };

  // eslint-disable-next-line
  const handleTouchEnd = (event: React.TouchEvent<any>) => {
    const touch = event.changedTouches[0];
    const withinX = touch.clientX <= rect.right && touch.clientX >= rect.left;
    const withinY = touch.clientY <= rect.bot && touch.clientY >= rect.top;

    if (click && withinX && withinY) click();

    setIsTouch(false);
  };

  const navItemClasses = classnames(styles.NavItem, {
    [styles.Bold]: bold,
    [styles.BorderMain]: borderMain,
    [styles.Clear]: clear,
    [styles.ClearMouseHover]: isMouse && clear,
    [styles.ClearTouchHover]: isTouch && clear,
    [styles.Link]: link,
    [styles.LinkMouseHover]: isMouse && link,
    [styles.LinkTouchHover]: isTouch && link,
    [styles.Tall]: tall,
  });

  return (
    <NavLink
      activeClassName={noActiveClass ? '' : styles.Active}
      className={navItemClasses}
      exact
      onClick={click}
      onTouchEnd={handleTouchEnd}
      onTouchStart={handleTouchStart}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      to={to}
    >
      {children}
    </NavLink>
  );
};

// eslint-disable-next-line
export default withRouter(NavItem as any);
