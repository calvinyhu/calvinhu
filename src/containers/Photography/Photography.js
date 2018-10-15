import React from 'react';
import { NavLink } from 'react-router-dom';
import Fade from 'react-reveal/Fade';

import classes from './Photography.css';
import { MAT_ICONS } from '../../utils/styles';
import { firestore, storage } from '../../utils/firebase';

let photos = null;

class Photography extends React.PureComponent {
  state = {
    isLoaded: {},
    isExpandPhoto: false,
    photos: photos,
    src: null,
    hoverPhoto: null
  };

  componentDidMount() {
    if (!this.state.photos) this.getPhotos();
  }

  getPhotos = () => {
    firestore
      .collection('photography')
      .doc('photoDetails')
      .get()
      .then(doc => {
        if (doc.exists) {
          const data = doc.data();

          const ids = Object.keys(data);
          ids.forEach(id => {
            storage
              .ref(`photography/${id}`)
              .getDownloadURL()
              .then(url => {
                data[id].url = url;
                this.setState({ photos: data });
              });
          });

          photos = data;
        } else console.log('Photo details do not exist!');
      });
  };

  loadHandlers = {};
  getLoadHandler = photoId => {
    if (!this.loadHandlers[photoId]) {
      this.loadHandlers[photoId] = () => {
        const isLoaded = { ...this.state.isLoaded };
        isLoaded[photoId] = true;
        this.setState({ isLoaded });
      };
    }
    return this.loadHandlers[photoId];
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
    if (!this.state.photos) return null;

    const gallery = [];
    const photoIds = Object.keys(this.state.photos);
    photoIds.forEach(id => {
      let imgContainerClasses = classes.ImgContainer + ' ' + classes.Hide;
      if (this.state.isLoaded[id]) imgContainerClasses += ' ' + classes.Show;

      let detailsClasses = classes.Details;
      if (this.state.hoverPhoto === id) {
        imgContainerClasses += ' ' + classes.ImgContainerHover;
        detailsClasses += ' ' + classes.DetailsHover;
      }

      let img = (
        <img
          onLoad={this.getLoadHandler(id)}
          src={this.state.photos[id].url}
          alt="calvinhu"
        />
      );

      gallery.push(
        <Fade key={id}>
          <div
            className={classes.GalleryItem}
            onMouseOver={this.getHoverHandler(id)}
            onClick={this.getOpenHandler(this.state.photos[id].url)}
          >
            <div className={imgContainerClasses}>{img}</div>
            <div className={detailsClasses}>
              <h5>{this.state.photos[id].name}</h5>
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

    let gallery = this.renderPhotos();

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
        <div className={MAT_ICONS + ' ' + classes.TouchApp}>touch_app</div>
        {card}
      </div>
    );
  }
}

export default Photography;
