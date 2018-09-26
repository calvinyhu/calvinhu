import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../utils/utilities';

const initialState = {
  photoUrls: null,
  photoDetails: null
};

const setPhotos = (state, action) => {
  return updateObject(state, {
    photoUrls: action.photoUrls
  });
};

const setPhotoDetails = (state, action) => {
  return updateObject(state, {
    photoDetails: action.photoDetails
  });
};

const photographyReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_PHOTO_URLS:
      return setPhotos(state, action);
    case actionTypes.SET_PHOTO_DETAILS:
      return setPhotoDetails(state, action);
    default:
      return state;
  }
};

export default photographyReducer;
