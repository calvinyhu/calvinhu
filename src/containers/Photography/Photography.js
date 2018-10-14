import React, { PureComponent } from 'react';
import { NavLink } from 'react-router-dom';
import Fade from 'react-reveal/Fade';

import classes from './Photography.css';
import { firestore } from '../../utils/firebase';
import lake_siskiyou_med from '../../assets/images/DSC_9569-1440p50.jpg';

let photoUrls = null;
let photoDetails = null;

class Photography extends PureComponent {
  state = {
    isExpandPhoto: false,
    photoUrls: photoUrls,
    photoDetails: photoDetails,
    src: null,
    hoverPhoto: null
  };

  componentDidMount() {
    if (!this.state.photoUrls) this.getPhotoInfo();
  }

  getPhotoInfo = () => {
    firestore
      .collection('photography')
      .doc('photoUrls')
      .get()
      .then(doc => {
        // if (doc.exists) this.props.onSetPhotoUrls(doc.data());
        if (doc.exists) {
          photoUrls = doc.data();
          this.setState({ photoUrls: doc.data() });
        } else console.log('Photo urls do not exist!');
      });

    firestore
      .collection('photography')
      .doc('photoDetails')
      .get()
      .then(doc => {
        // if (doc.exists) this.props.onSetPhotoDetails(doc.data());
        if (doc.exists) {
          photoDetails = doc.data();
          this.setState({ photoDetails: doc.data() });
        } else console.log('Photo details do not exist!');
      });
  };

  hoverHandlers = {};
  getHoverHandler = photoId => {
    if (!this.hoverHandlers[photoId]) {
      this.hoverHandlers[photoId] = () => {
        if (this.state.hoverPhoto !== photoId)
          this.setState({ hoverPhoto: photoId });
      };
    }
    return this.hoverHandlers[photoId];
  };

  openHandlers = {};
  getOpenHandler = src => {
    if (!this.openHandlers[src]) {
      this.openHandlers[src] = () =>
        this.setState({ isExpandPhoto: true, src: src });
    }
    return this.openHandlers[src];
  };

  handleMouseLeave = () => this.setState({ hoverPhoto: null });
  handleClose = () => this.setState({ isExpandPhoto: false });

  renderPhotos = () => {
    const gallery = [];

    let lake_siskiyou_id = 'lake_siskiyou';
    let imgContainerClasses = classes.ImgContainer;
    let detailsClasses = classes.Details;
    if (this.state.hoverPhoto === lake_siskiyou_id) {
      imgContainerClasses += ' ' + classes.ImgContainerHover;
      detailsClasses += ' ' + classes.DetailsHover;
    }
    gallery.push(
      <Fade key={lake_siskiyou_id}>
        <div
          className={classes.GalleryItem}
          onMouseOver={this.getHoverHandler(lake_siskiyou_id)}
          onClick={this.getOpenHandler(lake_siskiyou_med)}
        >
          <div className={imgContainerClasses}>
            <img src={lake_siskiyou_med} alt="calvinhu" />
          </div>
          <div className={detailsClasses}>
            <h5>Lake Siskiyou</h5>
          </div>
        </div>
      </Fade>
    );

    const photoIds = Object.keys(this.state.photoUrls);
    photoIds.forEach(id => {
      imgContainerClasses = classes.ImgContainer;
      detailsClasses = classes.Details;
      if (this.state.hoverPhoto === id) {
        imgContainerClasses += ' ' + classes.ImgContainerHover;
        detailsClasses += ' ' + classes.DetailsHover;
      }
      gallery.push(
        <Fade key={id}>
          <div
            className={classes.GalleryItem}
            onMouseOver={this.getHoverHandler(id)}
            onClick={this.getOpenHandler(this.state.photoUrls[id])}
          >
            <div className={imgContainerClasses}>
              <img src={this.state.photoUrls[id]} alt="calvinhu" />
            </div>
            <div className={detailsClasses}>
              <h5>{this.state.photoDetails[id].name}</h5>
            </div>
          </div>
        </Fade>
      );
    });

    return gallery;
  };

  render() {
    const navClasses = classes.Nav + ' ' + classes.Hide + ' ' + classes.FadeIn;
    const nav = (
      <div className={navClasses}>
        <div className={classes.Logo}>
          <h3>Calvin Hu</h3>
        </div>
        <NavLink className={classes.NavLink} to="/">
          Home
        </NavLink>
      </div>
    );

    let gallery = [];
    if (this.state.photoUrls && this.state.photoDetails)
      gallery = this.renderPhotos();

    let cardClasses = 'card ' + classes.Card;
    if (this.state.isExpandPhoto) cardClasses += ' ' + classes.CardShow;
    let card = (
      <div className={cardClasses} onClick={this.handleClose}>
        <img className="card-img-top" src={this.state.src} alt="calvinhu" />
      </div>
    );

    return (
      <div className={classes.PhotographyContainer}>
        <div className={classes.Photography}>
          {nav}
          <div className={classes.Gallery} onMouseLeave={this.handleMouseLeave}>
            {gallery}
          </div>
        </div>
        {card}
      </div>
    );
  }
}

export default Photography;
