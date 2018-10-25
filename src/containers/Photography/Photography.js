import React from 'react';
import { NavLink } from 'react-router-dom';
import Fade from 'react-reveal/Fade';
import throttle from 'raf-throttle';

import styles from './Photography.module.scss';
import { MAT_ICONS } from '../../utils/styles';
import { firestore, storage } from '../../utils/firebase';

let photos = null;
let totalNumPhotos = 0;

class Photography extends React.PureComponent {
  state = {
    isLoaded: {},
    isExpandPhoto: false,
    isHideTouchApp: false,
    numPhotos: 10,
    totalNumPhotos: totalNumPhotos,
    photos: photos,
    src: null,
    hoverPhoto: null
  };

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);

    if (!this.state.photos) this.getPhotos();

    setTimeout(() => this.setState({ isHideTouchApp: true }), 7000);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    throttle(this.showMorePhotos());
  };

  showMorePhotos = () => {
    const scrollHeight = Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.offsetHeight,
      document.body.clientHeight,
      document.documentElement.clientHeight
    );

    const isAtBottom = window.scrollY > scrollHeight - window.innerHeight * 1.3;
    const isMorePhotos = this.state.numPhotos < this.state.totalNumPhotos;

    if (isAtBottom && isMorePhotos) {
      this.setState(prevState => {
        return { numPhotos: prevState.numPhotos + 10 };
      });
    }
  };

  getPhotos = async () => {
    let data = null;
    const urls = await firestore
      .collection('photography')
      .doc('photoDetails')
      .get()
      .then(doc => {
        if (doc.exists) {
          data = doc.data();
          return this.getUrls(data);
        } else console.log('Photo details do not exist!');
      })
      .catch(error => console.log(error));

    const ids = Object.keys(data);
    ids.forEach((id, index) => (data[id].url = urls[index]));

    photos = data;
    totalNumPhotos = ids.length;
    this.setState({ photos: data, totalNumPhotos: ids.length });
  };

  getUrls = data => {
    const urlPromises = [];

    const ids = Object.keys(data);
    ids.forEach(id => {
      const urlPromise = storage.ref(`photography/${id}`).getDownloadURL();
      urlPromises.push(urlPromise);
    });

    return Promise.all(urlPromises).then(urls => urls);
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
    photoIds.forEach((id, index) => {
      if (index + 1 > this.state.numPhotos) return;

      let imgContainerClasses = styles.ImgContainer + ' ' + styles.Hide;
      if (this.state.isLoaded[id]) imgContainerClasses += ' ' + styles.Show;

      let detailsClasses = styles.Details;
      if (this.state.hoverPhoto === id) {
        imgContainerClasses += ' ' + styles.ImgContainerHover;
        detailsClasses += ' ' + styles.DetailsHover;
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
            className={styles.GalleryItem}
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
    const navClasses = styles.Nav + ' ' + styles.Hide + ' ' + styles.FadeIn;
    const nav = (
      <div className={navClasses}>
        <div className={styles.Logo}>
          <h3>Calvin Hu</h3>
        </div>
        <NavLink className={styles.NavLink} to="/">
          Home
        </NavLink>
      </div>
    );

    let gallery = this.renderPhotos();

    let cardClasses = 'card ' + styles.Card;
    if (this.state.isExpandPhoto) cardClasses += ' ' + styles.CardShow;
    let card = (
      <div className={cardClasses} onClick={this.handleClose}>
        <img className="card-img-top" src={this.state.src} alt="calvinhu" />
      </div>
    );

    let loader = null;
    if (!this.state.photos) {
      loader = (
        <div className={styles.LoaderContainer}>
          <div className={styles.Loader} />
        </div>
      );
    }

    let touchAppClasses = MAT_ICONS + ' ' + styles.TouchApp;
    if (this.state.isHideTouchApp) touchAppClasses += ' ' + styles.HideTouchApp;

    return (
      <div className={styles.PhotographyContainer}>
        <div className={styles.Photography}>
          {nav}
          {loader}
          <div className={styles.Gallery} onMouseLeave={this.handleMouseLeave}>
            {gallery}
          </div>
        </div>
        <div className={touchAppClasses}>touch_app</div>
        {card}
      </div>
    );
  }
}

export default Photography;
