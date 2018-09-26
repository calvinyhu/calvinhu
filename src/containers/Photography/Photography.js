import React, { PureComponent } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import Reveal from 'react-reveal/Reveal';

import classes from './Photography.css';
import { firestore } from '../../utils/firebase';
import lake_siskiyou from '../../assets/images/lake_siskiyou.jpg';
import * as actions from '../../store/actions/photographyActions';

const mapStateToProps = state => {
  return {
    photos: state.photos
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSetPhotos: photos => dispatch(actions.setPhotos(photos))
  };
};

class Photography extends PureComponent {
  state = {
    isExpandPhoto: false,
    src: null
  };

  openHandlers = {};

  componentDidMount() {
    if (!this.props.photos) this.getPhotoInfo();
  }

  getOpenHandler = src => {
    if (!this.openHandlers[src]) {
      this.openHandlers[src] = () =>
        this.setState({ isExpandPhoto: true, src: src });
    }
    return this.openHandlers[src];
  };

  handleClose = () => {
    this.setState({ isExpandPhoto: false });
  };

  getPhotoInfo = () => {
    firestore
      .collection('photography')
      .doc('photoUrls')
      .get()
      .then(doc => {
        if (doc.exists) this.props.onSetPhotos(doc.data());
        else console.log('Photos do not exist');
      });
  };

  renderPhotos = () => {
    const gallery = [];

    gallery.push(
      <Reveal effect={classes.BlockSlideFadeIn} key={'lake_siskiyou'}>
        <div
          className={classes.ImgContainer}
          onClick={this.getOpenHandler(lake_siskiyou)}
        >
          <img src={lake_siskiyou} alt="calvinhu" />
        </div>
      </Reveal>
    );

    const photoIds = Object.keys(this.props.photos);
    photoIds.forEach(id => {
      gallery.push(
        <Reveal effect={classes.BlockSlideFadeIn} key={id}>
          <div
            className={classes.ImgContainer}
            onClick={this.getOpenHandler(this.props.photos[id])}
          >
            <img src={this.props.photos[id]} alt="calvinhu" />
          </div>
        </Reveal>
      );
    });

    return gallery;
  };

  render() {
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

    let gallery = [];
    if (this.props.photos) gallery = this.renderPhotos();

    let cardClasses = 'card ' + classes.Card;
    if (this.state.isExpandPhoto) cardClasses += ' ' + classes.CardOnScreenY;
    let card = (
      <div className={cardClasses} onClick={this.handleClose}>
        <img className="card-img-top" src={this.state.src} alt="calvinhu" />
      </div>
    );

    return (
      <div className={classes.PhotographyContainer}>
        <div className={classes.Photography}>
          {nav}
          <div className={classes.Gallery}>{gallery}</div>
        </div>
        {card}
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Photography);
