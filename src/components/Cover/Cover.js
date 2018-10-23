import React from 'react';
import throttle from 'raf-throttle';
import { Link } from 'react-router-dom';

import classes from './Cover.css';
import { PAGE } from '../../containers/Home/Home';
import Button from '../UI/Button/Button';
import Rf from '../UI/Icon/Rf/Rf';

const FRICTION = 1 / 30;
const DISPLACE_X = 20;
const DISPLACE_Y = 20;

class Cover extends React.PureComponent {
  state = {
    x: 0,
    y: 0,
    followX: 0,
    followY: 0,
    isAnimating: false
  };

  clickWeb = () => this.props.click(PAGE.WEB);
  clickAbout = () => this.props.click(PAGE.ABOUT);
  clickResume = () => this.props.click(PAGE.RESUME);

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
          transform: `translate(${this.state.x + this.props.offsetX}px, ${
            this.state.y
          }px) scale(1.4)`
        }}
      />
    );

    const lightenFilter = <div className={classes.LightenFilter} />;

    const blurb = (
      <div className={classes.Blurb}>
        <h1 className={classes.Name}>Hi, I'm Calvin</h1>
      </div>
    );

    const nav = (
      <div className={classes.Nav}>
        <div className={classes.PageLinks}>
          <div className={classes.PageLink}>
            <Button link click={this.clickWeb}>
              Web Apps
            </Button>
          </div>
          <div className={classes.PageLink}>
            <Button link click={this.clickAbout}>
              About
            </Button>
          </div>
          <div className={classes.PageLink}>
            <Button link click={this.clickResume}>
              Resume
            </Button>
          </div>
        </div>
      </div>
    );

    const socialMedia = (
      <div className={classes.SocialMedia}>
        <a
          className={classes.ImgContainer}
          href="https://www.linkedin.com/in/calvinyhu/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Rf lg>linkedin</Rf>
        </a>
        <a
          className={classes.ImgContainer}
          href="https://www.github.com/calvinyhu/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Rf lg>github</Rf>
        </a>
        <Link to="/photo">
          <Rf lg>image</Rf>
        </Link>
      </div>
    );

    const coverText = (
      <div className={classes.CoverText}>
        {blurb}
        {nav}
      </div>
    );

    const coverContent = (
      <div className={classes.CoverContent}>
        {coverText}
        {socialMedia}
      </div>
    );

    return (
      <div className={classes.Cover} onMouseMove={this.handleMouseMove}>
        {background}
        {lightenFilter}
        {coverContent}
      </div>
    );
  }
}

export default Cover;
