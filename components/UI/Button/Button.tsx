import { useState, FC } from 'react';
import clsx from 'clsx';

import styles from './Button.module.scss';

interface ButtonProps {
  adj?: boolean;
  ariaLabel: string;
  blueGray?: boolean;
  clear?: boolean;
  circle?: boolean;
  // eslint-disable-next-line
  click?: any;
  disabled?: boolean;
  id?: string | undefined;
  link?: boolean;
  name?: string;
  noBackground?: boolean;
  opp?: boolean;
}

const Button: FC<ButtonProps> = ({
  adj = false,
  ariaLabel,
  blueGray = false,
  children,
  clear = false,
  circle = false,
  click,
  disabled = false,
  id = undefined,
  link = false,
  name = undefined,
  noBackground = false,
  opp = false,
}) => {
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
    if (event && event.cancelable) event.preventDefault();

    const touch = event.changedTouches[0];
    const withinX = touch.clientX <= rect.right && touch.clientX >= rect.left;
    const withinY = touch.clientY <= rect.bot && touch.clientY >= rect.top;

    if (click && withinX && withinY) click();

    setIsTouch(false);
  };

  const buttonClasses = clsx({
    [styles.Button]: true,
    [styles.Clear]: clear,
    [styles.Link]: link,
    [styles.Circle]: circle,
    [styles.Adj]: adj,
    [styles.Opp]: opp,
    [styles.BlueGray]: blueGray,
    [styles.NoBackground]: noBackground,

    [styles.ClearTouchHover]: isTouch && clear,
    [styles.LinkTouchHover]: isTouch && link,
    [styles.AdjTouchHover]: isTouch && adj,
    [styles.OppTouchHover]: isTouch && opp,
    [styles.BlueGrayTouchHover]: isTouch && blueGray,

    [styles.ClearMouseHover]: isMouse && clear,
    [styles.LinkMouseHover]: isMouse && link,
    [styles.AdjMouseHover]: isMouse && adj,
    [styles.OppMouseHover]: isMouse && opp,
    [styles.BlueGrayMouseHover]: isMouse && blueGray,
  });

  return (
    <button
      aria-label={ariaLabel}
      className={buttonClasses}
      disabled={disabled}
      id={id}
      onClick={click}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchEnd={handleTouchEnd}
      onTouchStart={handleTouchStart}
      name={name}
    >
      {children}
    </button>
  );
};

export default Button;
