import React from 'react';
import Fade from 'react-reveal/Fade';
import throttle from 'raf-throttle';
import classnames from 'classnames';

import styles from './Photography.module.scss';
import Gallery from '../../components/Gallery/Gallery';
import Fa from '../../components/UI/Icon/Fa/Fa';
import { firestore, storage } from '../../utils/firebase';

let photos = null;
let totalNumPhotos = 0;
let timeout = null;

class Photography extends React.PureComponent {
  isAlive = false;

  state = {
    isHideTouchApp: false,
    numPhotos: 10,
    photos: photos,
    totalNumPhotos: totalNumPhotos,
  };

  componentDidMount() {
    this.isAlive = true;
    window.addEventListener('scroll', this.handleScroll);
    timeout = setTimeout(() => this.setState({ isHideTouchApp: true }), 7000);

    if (window.top !== 0) window.scrollTo({ top: 0 });
    if (!this.state.photos) this.getPhotos();
  }

  componentWillUnmount() {
    this.isAlive = false;
    window.removeEventListener('scroll', this.handleScroll);
    clearTimeout(timeout);
  }

  handleScroll = () => throttle(this.showMorePhotos());

  showMorePhotos = () => {
    const scrollHeight = Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.offsetHeight,
      document.body.clientHeight,
      document.documentElement.clientHeight,
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

    if (!this.isAlive) return;
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

  render() {
    let loader = null;
    if (!this.state.photos) {
      loader = (
        <div className={styles.LoaderContainer}>
          <div className={styles.Loader} />
        </div>
      );
    }

    const touchAppClasses = classnames({
      [styles.TouchApp]: true,
      [styles.HideTouchApp]: this.state.isHideTouchApp,
    });
    const touchAppIcon = (
      <div className={touchAppClasses}>
        <Fade>
          <Fa lg>fas fa-hand-point-up</Fa>
        </Fade>
      </div>
    );

    return (
      <div className={styles.PhotographyContainer}>
        <Gallery numPhotos={this.state.numPhotos} photos={this.state.photos} />
        {loader}
        {touchAppIcon}
      </div>
    );
  }
}

export default Photography;
