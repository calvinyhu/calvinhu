import React from 'react';
import throttle from 'raf-throttle';
import PropTypes from 'prop-types';

import Fa from '../UI/Icon/Fa/Fa';

import styles from './Cover.module.scss';
import p1080 from '../../assets/images/DSC_9569-1080p50-blurred.jpg';
import p1440 from '../../assets/images/DSC_9569-1440p50-blurred.jpg';
import p2160 from '../../assets/images/DSC_9569-2160p35-blurred.jpg';

const FRICTION = 1 / 30;
const DISPLACE_X = 20;
const DISPLACE_Y = 20;

class Cover extends React.PureComponent {
  static propTypes = {
    offsetX: PropTypes.number.isRequired,
  };

  state = {
    x: 0,
    y: 0,
    followX: 0,
    followY: 0,
    isAnimating: false,
  };

  handleMouseMove = event => {
    if (event.movementX !== 0 || event.movementY !== 0)
      throttle(this.setAnimationValues(event.clientX, event.clientY));
  };

  // Effect provided by Fabio Ottaviani (https://codepen.io/supah/pen/RrzREx) that I modified to not run infinitely
  setAnimationValues = (mouseX, mouseY) => {
    if (!mouseX && !mouseY) return;

    let x = null;
    let y = null;
    let followX = null;
    let followY = null;

    x = Math.max(-100, Math.min(100, window.innerWidth / 2 - mouseX));
    y = Math.max(-100, Math.min(100, window.innerHeight / 2 - mouseY));
    followX = (DISPLACE_X * x) / 100;
    followY = (DISPLACE_Y * y) / 100;

    this.setState({ followX: followX, followY: followY });

    // Start the animation loop
    if (!this.state.isAnimating) {
      this.setState({ isAnimating: true });
      this.animateBackground();
    }
  };

  // Effect provided by Fabio Ottaviani (https://codepen.io/supah/pen/RrzREx) that I modified to not run infinitely
  animateBackground = () => {
    if (window.location.pathname !== '/') return;

    this.setState(prevState => {
      return {
        x: prevState.x + (this.state.followX - prevState.x) * FRICTION,
        y: prevState.y + (this.state.followY - prevState.y) * FRICTION,
      };
    });

    const stateX = Math.abs(this.state.x);
    const stateY = Math.abs(this.state.y);
    const followX = Math.abs(this.state.followX);
    const followY = Math.abs(this.state.followY);

    // Only continue the animation if within a 1px threshold OR initial animation
    if (stateX === 0 || stateX < followX - 1 || stateY < followY - 1)
      window.requestAnimationFrame(this.animateBackground);
    else this.setState({ isAnimating: false });
  };

  renderBackground = () => (
    <div
      style={{
        transform: `translate3d(${this.state.x + this.props.offsetX}px, ${
          this.state.y
        }px, 0px) scale3d(1.4,1.4,1.4)`,
      }}
      className={styles.Background}
    >
      <picture>
        <source media="(min-width: 1440px)" srcSet={p1440} />
        <source media="(min-width: 2160px)" srcSet={p2160} />
        <img src={p1080} alt="me" />
      </picture>
      <div className={styles.LightenFilter} />
    </div>
  );

  renderCoverContent = () => (
    <div className={styles.CoverContent}>
      <div className={styles.Text}>
        <h1>Calvin</h1>
        <h1>Hu</h1>
      </div>
      <div className={styles.Icon}>
        <Fa lg>fas fa-angle-down</Fa>
      </div>
    </div>
  );

  render() {
    return (
      <div className={styles.Cover} onMouseMove={this.handleMouseMove}>
        {this.renderBackground()}
        {this.renderCoverContent()}
      </div>
    );
  }
}

export default Cover;
