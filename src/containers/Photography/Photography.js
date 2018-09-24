import React, { PureComponent } from 'react';
import { NavLink } from 'react-router-dom';
import { firestore } from '../../utils/firebase';
import { lake_siskiyou } from '../../assets/images/lake_siskiyou.jpg';

import classes from './Photography.css';

class Photography extends PureComponent {
  state = {
    photos: null
  };

  componentDidMount() {
    if (!this.state.photos) {
      // this.getPhotos();
    }
  }

  getPhotos = () => {
    const photographyRef = firestore.collection('photography');

    photographyRef
      .doc('photoUrls')
      .get()
      .then(doc => {
        if (doc.exists) this.setState({ photos: doc.data() });
      });
  };

  renderPhotos = () => {
    const gallery = [];

    gallery.push(
      <div className={classes.ImgContainer} key={'lake_siskiyou'}>
        <img src={lake_siskiyou} alt="calvinhu" />
      </div>
    );

    const photoIds = Object.keys(this.state.photos);
    photoIds.forEach(id => {
      gallery.push(
        <div className={classes.ImgContainer} key={id}>
          <img src={this.state.photos[id]} alt="calvinhu" />
        </div>
      );
    });
    return gallery;
  };

  render() {
    let gallery = [];
    if (this.state.photos) gallery = this.renderPhotos();

    const navClasses =
      classes.Nav + ' ' + classes.Hide + ' ' + classes.TextSlideFadeIn;
    const nav = (
      <div className={navClasses}>
        <div className={classes.Logo}>
          <h2>Calvin Hu</h2>
        </div>
        <NavLink className={classes.NavLink} to="/">
          Home
        </NavLink>
      </div>
    );

    return (
      <div className={classes.Photography}>
        {nav}
        <div className={classes.Gallery}>{gallery}</div>
      </div>
    );
  }
}

export default Photography;
