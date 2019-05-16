import React, { Component } from 'react';
import classnames from 'classnames';

import styles from './Gallery.module.scss';
import GalleryItem from './GalleryItem/GalleryItem';

class Gallery extends Component {
  state = {
    hoverPhoto: null,
    isExpandPhoto: false,
    isLoaded: {},
    src: null,
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

  openHandlers = {};
  getOpenHandler = (id, src) => {
    if (!this.openHandlers[id]) {
      this.openHandlers[id] = () => {
        if (!this.state.isLoaded[id]) return;
        this.setState({ isExpandPhoto: true, src: src });
      };
    }
    return this.openHandlers[id];
  };

  handleClose = () => this.setState({ isExpandPhoto: false, src: null });
  handleMouseLeave = () => this.setState({ hoverPhoto: null });

  renderGalleryItems = () => {
    if (!this.props.photos) return null;

    const galleryItems = [];

    const photoIds = Object.keys(this.props.photos);
    photoIds.forEach((id, index) => {
      if (index + 1 > this.props.numPhotos) return;
      galleryItems.push(
        <GalleryItem
          key={id}
          getHoverHandler={this.getHoverHandler}
          getOpenHandler={this.getOpenHandler}
          getLoadHandler={this.getLoadHandler}
          hoverPhoto={this.state.hoverPhoto}
          id={id}
          isLoaded={this.state.isLoaded}
          photos={this.props.photos}
        />,
      );
    });

    return galleryItems;
  };

  render() {
    const galleryItems = this.renderGalleryItems();

    const cardClasses = classnames({
      card: true,
      [styles.Card]: true,
      [styles.CardShow]: this.state.isExpandPhoto,
    });
    const card = (
      <div className={cardClasses} onClick={this.handleClose}>
        <img className="card-img-top" src={this.state.src} alt="calvinhu" />
      </div>
    );

    return (
      <React.Fragment>
        <div className={styles.Gallery} onMouseLeave={this.handleMouseLeave}>
          {galleryItems}
        </div>
        {card}
      </React.Fragment>
    );
  }
}

export default Gallery;
