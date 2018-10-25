import React from 'react';
import { NavLink } from 'react-router-dom';
import Fade from 'react-reveal/Fade';
import throttle from 'raf-throttle';
import classnames from 'classnames';

import styles from './Photography.module.scss';
import { MAT_ICONS } from '../../utils/styles';
import { firestore, storage } from '../../utils/firebase';

let photos = null;
let totalNumPhotos = 0;
let timeout = null;

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
    timeout = setTimeout(() => this.setState({ isHideTouchApp: true }), 7000);
  }

  componentWillUnmount() {
    clearTimeout(timeout);
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => throttle(this.showMorePhotos());

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

    const galleryItems = [];
    const photoIds = Object.keys(this.state.photos);
    photoIds.forEach((id, index) => {
      if (index + 1 > this.state.numPhotos) return;

      const imgContainerClasses = classnames({
        [styles.ImgContainer]: true,
        [styles.Hide]: true,
        [styles.Show]: this.state.isLoaded[id],
        [styles.ImgContainerHover]: this.state.hoverPhoto === id
      });

      const detailsClasses = classnames({
        [styles.Details]: true,
        [styles.DetailsHover]: this.state.hoverPhoto === id
      });

      galleryItems.push(
        <Fade key={id}>
          <div
            className={styles.GalleryItem}
            onMouseOver={this.getHoverHandler(id)}
            onClick={this.getOpenHandler(this.state.photos[id].url)}
          >
            <div className={imgContainerClasses}>
              <img
                onLoad={this.getLoadHandler(id)}
                src={this.state.photos[id].url}
                alt="calvinhu"
              />
            </div>
            <div className={detailsClasses}>
              <h5>{this.state.photos[id].name}</h5>
            </div>
          </div>
        </Fade>
      );
    });

    return galleryItems;
  };

  render() {
    const navClasses = classnames({
      [styles.Nav]: true,
      [styles.Hide]: true,
      [styles.FadeIn]: true
    });
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

    const blurb = (
      <div className={styles.Blurb}>
        <Fade>
          <p>Enjoy some of my best images that I have captured since 2013.</p>
        </Fade>
      </div>
    );

    const galleryItems = this.renderPhotos();
    const gallery = (
      <div className={styles.Gallery} onMouseLeave={this.handleMouseLeave}>
        {galleryItems}
      </div>
    );

    const cardClasses = classnames({
      card: true,
      [styles.Card]: true,
      [styles.CardShow]: this.state.isExpandPhoto
    });
    const card = (
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

    const touchAppClasses = classnames({
      [MAT_ICONS]: true,
      [styles.TouchApp]: true,
      [styles.HideTouchApp]: this.state.isHideTouchApp
    });
    const touchAppIcon = <div className={touchAppClasses}>touch_app</div>;

    return (
      <div className={styles.PhotographyContainer}>
        {nav}
        {blurb}
        {gallery}
        {card}
        {loader}
        {touchAppIcon}
      </div>
    );
  }
}

export default Photography;
