import React, { PureComponent } from 'react';
import throttle from 'raf-throttle';

import classes from './Cover.css';
import { PAGE } from '../../containers/Home/Home';
import linkedin from '../../assets/images/In-Black-66px-R.png';
import github from '../../assets/images/GitHub-Mark-64px.png';

const FRICTION = 1 / 30;
const DISPLACE_X = 20;
const DISPLACE_Y = 20;

class Cover extends PureComponent {
  state = {
    x: 0,
    y: 0,
    followX: 0,
    followY: 0,
    isAnimating: false
  };

  componentDidMount() {
    if (window.DeviceOrientationEvent) {
      window.addEventListener(
        'deviceorientation',
        this.handleOrientationEvent,
        true
      );
    }
  }

  componentWillUnmount() {
    if (window.DeviceOrientationEvent) {
      window.removeEventListener(
        'deviceorientation',
        this.handleOrientationEvent,
        true
      );
    }
  }

  handleOrientationEvent = event => {
    throttle(this.setAnimationValues(event.beta, event.gamma, false));
  };

  clickWeb = () => this.props.click(PAGE.WEB);
  clickAbout = () => this.props.click(PAGE.ABOUT);
  clickResume = () => this.props.click(PAGE.RESUME);

  handleMouseMove = event => {
    throttle(this.setAnimationValues(event.clientX, event.clientY, true));
  };

  // Effect provided by Fabio Ottaviani (https://codepen.io/supah/pen/RrzREx) that I modified to not run infinitely
  setAnimationValues = (mouseX, mouseY, isMouseEvent) => {
    if (!mouseX && !mouseY) return;

    let x = null;
    let y = null;
    let followX = null;
    let followY = null;

    if (isMouseEvent) {
      x = Math.max(-100, Math.min(100, window.innerWidth / 2 - mouseX));
      y = Math.max(-100, Math.min(100, window.innerHeight / 2 - mouseY));
      followX = (DISPLACE_X * x) / 100;
      followY = (DISPLACE_Y * y) / 100;
    } else {
      x = mouseY;
      y = mouseX - 70;
      followX = (DISPLACE_X * 4 * x) / 100;
      followY = (DISPLACE_Y * 4 * y) / 100;
    }
    this.setState({ followX: followX, followY: followY });

    // Start the animation loop
    if (!this.state.isAnimating) {
      this.setState({ isAnimating: true });
      this.animateBackground();
    }
  };

  // Effect provided by Fabio Ottaviani (https://codepen.io/supah/pen/RrzREx) that I modified to not run infinitely
  animateBackground = () => {
    this.setState(prevState => {
      return {
        x: prevState.x + (this.state.followX - prevState.x) * FRICTION,
        y: prevState.y + (this.state.followY - prevState.y) * FRICTION
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

  render() {
    const background = (
      <div
        className={classes.Background}
        style={{
          transform: `translate(${this.state.x}px, ${
            this.state.y
          }px) scale(1.3)`
        }}
      />
    );

    const lightenFilter = <div className={classes.LightenFilter} />;

    const blurb = (
      <div className={classes.Blurb}>
        <h1 className={classes.Name}>Hi, I'm Calvin.</h1>
      </div>
    );

    const nav = (
      <div className={classes.Nav}>
        <h6 onClick={this.clickWeb}>Web Apps</h6>
        <h6 onClick={this.clickAbout}>About</h6>
        <h6 onClick={this.clickResume}>Resume</h6>
        <div className={classes.SocialMedia}>
          <a
            className={classes.ImgContainer}
            href="https://www.linkedin.com/in/calvinyhu/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={linkedin} alt="LinkedIn" />
          </a>
          <a
            className={classes.ImgContainer}
            href="https://www.github.com/calvinyhu/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={github} alt="GitHub" />
          </a>
        </div>
      </div>
    );

    const coverText = (
      <div className={classes.CoverText}>
        {blurb}
        {nav}
      </div>
    );

    return (
      <div className={classes.Cover} onMouseMove={this.handleMouseMove}>
        {background}
        {lightenFilter}
        {coverText}
      </div>
    );
  }
}

export default Cover;
