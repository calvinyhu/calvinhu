import React, { PureComponent } from 'react';
import throttle from 'raf-throttle';

import classes from './Cover.css';
import { PAGE } from '../../containers/Home/Home';
import linkedin from '../../assets/images/In-2C-128px-TM.png';
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

  clickWeb = () => this.props.click(PAGE.WEB);
  clickAbout = () => this.props.click(PAGE.ABOUT);
  clickResume = () => this.props.click(PAGE.RESUME);

  handleMouseMove = event => {
    throttle(this.setAnimationValues(event.clientX, event.clientY));
  };

  // Effect provided by Fabio Ottaviani (https://codepen.io/supah/pen/RrzREx) that I modified to not run infinitely
  setAnimationValues = (mouseX, mouseY) => {
    const x = Math.max(-100, Math.min(100, window.innerWidth / 2 - mouseX));
    const y = Math.max(-100, Math.min(100, window.innerHeight / 2 - mouseY));
    const followX = (DISPLACE_X * x) / 100;
    const followY = (DISPLACE_Y * y) / 100;
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

    const blur = <div className={classes.Blur} />;

    const blurb = (
      <div className={classes.Blurb}>
        <h1 className={classes.Name}>Hi, I'm Calvin</h1>
        <h2 className={classes.Title}>Web Developer</h2>
      </div>
    );

    const nav = (
      <div className={classes.Nav}>
        <h5 onClick={this.clickWeb}>Web Apps</h5>
        <h5 onClick={this.clickAbout}>About</h5>
        <h5 onClick={this.clickResume}>Resume</h5>
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

    return (
      <div className={classes.Cover} onMouseMove={this.handleMouseMove}>
        {background}
        {blur}
        <div className={classes.CoverText}>
          {blurb}
          {nav}
        </div>
      </div>
    );
  }
}

export default Cover;
