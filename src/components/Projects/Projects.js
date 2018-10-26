import React, { PureComponent } from 'react';
import Fade from 'react-reveal/Fade';
import { firestore, storage } from '../../utils/firebase';
import PropTypes from 'prop-types';

import styles from './Projects.module.scss';
import ProjectItem from './ProjectItem/ProjectItem';

let shmackUrls = [];
let jammmingUrls = [];

class Projects extends PureComponent {
  state = {
    shmackUrls: shmackUrls,
    jammmingUrls: jammmingUrls
  };

  componentDidMount() {
    if (
      this.state.shmackUrls.length === 0 ||
      this.state.jammmingUrls.length === 0
    )
      this.getPhotos();
    if (this.props.isClicked) this.props.scrollIntoView();
  }

  getPhotos = async () => {
    const data = await firestore
      .collection('projects')
      .doc('images')
      .get()
      .then(doc => {
        if (doc.exists) {
          return doc.data();
        } else console.log('Photos do not exist!');
      })
      .catch(error => console.log(error));

    const shmackPromise = this.getUrls(data['shmack']);
    const jammmingPromise = this.getUrls(data['jammming']);
    shmackUrls = await shmackPromise;
    jammmingUrls = await jammmingPromise;

    this.setState({ shmackUrls, jammmingUrls });
  };

  getUrls = images => {
    const urlPromises = [];
    images.forEach(image => {
      const urlPromise = storage.ref(`projects/${image}.webp`).getDownloadURL();
      urlPromises.push(urlPromise);
    });
    return Promise.all(urlPromises).then(urls => urls);
  };

  render() {
    let shmack = (
      <ProjectItem
        href="https://shmack.app"
        name="shmack.app"
        header="My Web Apps"
        description="Shmack is a platform where users can view, add, and vote on popular menu
      items at restaurants. This app aims to be fast, simple, and intuitive for finding quick
      eats."
        srcs={this.state.shmackUrls}
        themeColor={1}
        alt="shmack"
      />
    );

    let jammming = (
      <ProjectItem
        href="https://jammmingspotify.firebaseapp.com/"
        name="jammming"
        description="Jammming allows users to search songs, create a playlist, and add it to
      their Spotify account."
        srcs={this.state.jammmingUrls}
        themeColor={2}
        alt="jammming"
      />
    );

    return (
      <Fade>
        <div className={styles.Projects}>
          {shmack}
          {jammming}
        </div>
      </Fade>
    );
  }
}

Projects.propTypes = {
  isClicked: PropTypes.bool.isRequired,
  scrollIntoView: PropTypes.func.isRequired
};

export default Projects;
