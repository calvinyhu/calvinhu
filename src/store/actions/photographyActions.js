import * as actionTypes from '../actions/actionTypes';

export const setPhotoUrls = photoUrls => {
  return {
    type: actionTypes.SET_PHOTO_URLS,
    photoUrls: photoUrls
  };
};

export const setPhotoDetails = photoDetails => {
  return {
    type: actionTypes.SET_PHOTO_DETAILS,
    photoDetails: photoDetails
  };
};
