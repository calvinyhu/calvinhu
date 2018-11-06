import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import styles from './Button.module.scss';

class Button extends PureComponent {
  static propTypes = {
    link: PropTypes.bool,
    circle: PropTypes.bool,
    adj: PropTypes.bool,
    opp: PropTypes.bool,
    click: PropTypes.func,
    children: PropTypes.any
  };

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

    if (this.props.click && withinX && withinY) this.props.click(event);

    this.setState({ isTouch: false });
  };

  handleMouseEnter = () => this.setState({ isMouse: true });
  handleMouseLeave = () => this.setState({ isMouse: false });

  render() {
    const buttonClasses = classnames({
      [styles.Button]: true,
      [styles.Clear]: this.props.clear,
      [styles.Link]: this.props.link,
      [styles.Circle]: this.props.circle,
      [styles.Adj]: this.props.adj,
      [styles.Opp]: this.props.opp,
      [styles.ClearTouchHover]: this.state.isTouch && this.props.clear,
      [styles.LinkTouchHover]: this.state.isTouch && this.props.link,
      [styles.AdjTouchHover]: this.state.isTouch && this.props.adj,
      [styles.OppTouchHover]: this.state.isTouch && this.props.opp,
      [styles.ClearMouseHover]: this.state.isMouse && this.props.clear,
      [styles.LinkMouseHover]: this.state.isMouse && this.props.link,
      [styles.AdjMouseHover]: this.state.isMouse && this.props.adj,
      [styles.OppMouseHover]: this.state.isMouse && this.props.opp
    });

    return (
      <button
        id={this.props.id}
        className={buttonClasses}
        name={this.props.name}
        disabled={this.props.disabled}
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

export default Button;
