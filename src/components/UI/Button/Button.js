import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import classes from './Button.module.scss';

class Button extends PureComponent {
  isTouched = false;
  touchBounds = { top: 0, bot: 0, left: 0, right: 0 };

  state = {
    isMouse: false,
    isTouch: false
  };

  handleTouchStart = event => {
    const rect = event.target.getBoundingClientRect();
    this.touchBounds.top = rect.top;
    this.touchBounds.bot = rect.bottom;
    this.touchBounds.left = rect.left;
    this.touchBounds.right = rect.right;

    this.setState({ isTouch: true });
  };

  handleTouchEnd = event => {
    if (event && event.cancelable) event.preventDefault();

    const touch = event.changedTouches[0];
    const withinX =
      touch.clientX <= this.touchBounds.right &&
      touch.clientX >= this.touchBounds.left;
    const withinY =
      touch.clientY <= this.touchBounds.bot &&
      touch.clientY >= this.touchBounds.top;

    if (this.props.click && withinX && withinY) this.props.click();

    this.setState({ isTouch: false });
  };

  handleMouseEnter = () => this.setState({ isMouse: true });
  handleMouseLeave = () => this.setState({ isMouse: false });

  render() {
    let buttonClasses = classes.Button;

    if (this.props.link) buttonClasses += ' ' + classes.Link;
    if (this.props.circle) buttonClasses += ' ' + classes.Circle;
    if (this.props.adj) buttonClasses += ' ' + classes.Adj;
    if (this.props.opp) buttonClasses += ' ' + classes.Opp;

    // Hover effects
    if (this.state.isTouch) {
      if (this.props.link) buttonClasses += ' ' + classes.LinkTouchHover;
      if (this.props.adj) buttonClasses += ' ' + classes.AdjTouchHover;
      if (this.props.opp) buttonClasses += ' ' + classes.OppTouchHover;
    }

    if (this.state.isMouse) {
      if (this.props.link) buttonClasses += ' ' + classes.LinkMouseHover;
      if (this.props.adj) buttonClasses += ' ' + classes.AdjMouseHover;
      if (this.props.opp) buttonClasses += ' ' + classes.OppMouseHover;
    }

    return (
      <button
        className={buttonClasses}
        onTouchStart={this.handleTouchStart}
        onTouchEnd={this.handleTouchEnd}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        onClick={this.props.click}
      >
        {this.props.children}
      </button>
    );
  }
}

Button.propTypes = {
  link: PropTypes.bool,
  circle: PropTypes.bool,
  adj: PropTypes.bool,
  opp: PropTypes.bool,
  click: PropTypes.func,
  children: PropTypes.any
};

export default Button;
