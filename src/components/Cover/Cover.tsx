import React from 'react';
// @ts-ignore
import throttle from 'raf-throttle';

import Fa from '../UI/Fa/Fa';
import Button from '../UI/Button/Button';
import { CoverProps, CoverState } from './Cover.models';

import styles from './Cover.module.scss';
import p1080 from '../../assets/images/DSC_9569-1080p50-blurred.jpg';
import p1440 from '../../assets/images/DSC_9569-1440p50-blurred.jpg';
import p2160 from '../../assets/images/DSC_9569-2160p35-blurred.jpg';

const FRICTION = 1 / 30;
const DISPLACE_X = 20;
const DISPLACE_Y = 20;

class Cover extends React.PureComponent<CoverProps, CoverState> {
  state = {
    x: 0,
    y: 0,
    followX: 0,
    followY: 0,
    isAnimating: false,
  };

  handleMouseMove = (event: React.MouseEvent) => {
    if (event.movementX !== 0 || event.movementY !== 0)
      throttle(this.setAnimationValues(event.clientX, event.clientY));
  };

  // Effect provided by Fabio Ottaviani (https://codepen.io/supah/pen/RrzREx) that I modified to not run infinitely
  setAnimationValues = (mouseX: number, mouseY: number) => {
    const { isAnimating } = this.state;

    if (!mouseX && !mouseY) return;

    const x = Math.max(-100, Math.min(100, window.innerWidth / 2 - mouseX));
    const y = Math.max(-100, Math.min(100, window.innerHeight / 2 - mouseY));
    const followX = (DISPLACE_X * x) / 100;
    const followY = (DISPLACE_Y * y) / 100;

    this.setState({ followX, followY });

    // Start the animation loop
    if (!isAnimating) {
      this.setState({ isAnimating: true });
      this.animateBackground();
    }
  };

  // Effect provided by Fabio Ottaviani (https://codepen.io/supah/pen/RrzREx) that I modified to not run infinitely
  animateBackground = () => {
    const { x, y, followX, followY } = this.state;

    if (window.location.pathname !== '/') return;

    this.setState(prevState => {
      return {
        x: prevState.x + (followX - prevState.x) * FRICTION,
        y: prevState.y + (followY - prevState.y) * FRICTION,
      };
    });

    const absX = Math.abs(x);
    const absY = Math.abs(y);
    const absFollowX = Math.abs(followX);
    const absFollowY = Math.abs(followY);

    // Only continue the animation if within a 1px threshold OR initial animation
    if (absX === 0 || absX < absFollowX - 1 || absY < absFollowY - 1)
      window.requestAnimationFrame(this.animateBackground);
    else this.setState({ isAnimating: false });
  };

  handleScrollDown = () => window.scrollTo({ top: window.innerHeight + 1 });

  renderBackground = () => {
    const { x, y } = this.state;
    const { offsetX } = this.props;

    return (
      <div
        style={{
          transform: `translate3d(${x +
            offsetX}px, ${y}px, 0px) scale3d(1.4,1.4,1.4)`,
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
  };

  renderCoverContent = () => (
    <div className={styles.CoverContent}>
      <div className={styles.Text}>
        <h1>Calvin</h1>
        <h1>Hu</h1>
      </div>
      <div className={styles.Icon}>
        <Button
          circle
          clear
          click={this.handleScrollDown}
          ariaLabel="Scroll Down"
        >
          <Fa lg>fas fa-angle-down</Fa>
        </Button>
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
