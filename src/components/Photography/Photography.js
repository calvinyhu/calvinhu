import React, { PureComponent } from 'react';

import classes from './Photography.css';

class Photography extends PureComponent {
  componentDidMount() {
    this.props.scrollIntoView();
  }

  handleClick = event => {
    console.log(event.target.offsetTop);
  };

  render() {
    let photographyClasses = classes.Photography + ' ' + classes.Hide;
    if (this.props.isAnimatePhotoScroll)
      photographyClasses = classes.Photography + ' ' + classes.BlockSlideFadeIn;

    const gallery = [];
    if (this.props.photos) {
      const photoIds = Object.keys(this.props.photos);
      photoIds.forEach(id => {
        gallery.push(
          <div
            className={classes.ImgContainer}
            key={id}
            onClick={this.handleClick}
          >
            <img src={this.props.photos[id]} alt="calvinhu" />
          </div>
        );
      });
    }

    return (
      <div className={photographyClasses}>
        <h4>Photos I've Captured</h4>
        <div className={classes.Gallery}>{gallery}</div>
      </div>
    );
  }
}

export default Photography;
