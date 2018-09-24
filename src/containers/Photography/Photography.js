import React, { PureComponent } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

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
  componentDidMount() {
    if (!this.props.photos) this.getPhotoInfo();
  }

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

  getDiff = (newIds, oldIds) => {
    if (!(newIds && oldIds)) return false;

    const idsToAdd = [];
    const newIdsLen = newIds.length;

    for (let newIdIndex = 0; newIdIndex < newIdsLen; newIdIndex++) {
      let isNewId = true;
      const oldIdsLen = oldIds.length;

      for (let oldIdIndex = 0; oldIdIndex < oldIdsLen; oldIdIndex++) {
        if (newIds[newIdIndex] === oldIds[oldIdIndex]) {
          oldIds.splice(oldIdIndex, 1);
          isNewId = false;
          break;
        }
      }
      if (isNewId) idsToAdd.push(newIds[newIdIndex]);
    }

    if (idsToAdd.length > 0 || oldIds.length > 0)
      return { add: idsToAdd, delete: oldIds };
    return null;
  };

  addPhotos = (idsToAdd, newPhotoInfo, oldPhotos) => {
    const photos = { ...oldPhotos };
    idsToAdd.forEach(id => {
      const img = new Image();
      img.src = newPhotoInfo[id];
      img.alt = 'calvinhu';
      photos[id] = img;
    });
    return photos;
  };

  deletePhotos = (idsToDelete, oldPhotos) => {
    const photos = { ...oldPhotos };
    idsToDelete.forEach(id => {
      delete photos[id];
    });
    return photos;
  };

  renderPhotos = () => {
    const gallery = [];

    gallery.push(
      <div className={classes.ImgContainer} key={'lake_siskiyou'}>
        <img src={lake_siskiyou} alt="calvinhu" />
      </div>
    );

    const photoIds = Object.keys(this.props.photos);
    photoIds.forEach(id => {
      gallery.push(
        <div className={classes.ImgContainer} key={id}>
          <img src={this.props.photos[id]} alt="calvinhu" />
        </div>
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

    return (
      <div className={classes.Photography}>
        {nav}
        <div className={classes.Gallery}>{gallery}</div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Photography);