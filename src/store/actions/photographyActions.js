import * as actionTypes from '../actions/actionTypes';

export const setPhotos = photos => {
  return {
    type: actionTypes.SET_PHOTOS,
    photos: photos
  };
};
