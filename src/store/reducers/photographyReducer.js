import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../utils/utilities';

const initialState = {
  photos: null
};

const setPhotos = (state, action) => {
  return updateObject(state, {
    photos: action.photos
  });
};

const photographyReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_PHOTOS:
      return setPhotos(state, action);
    default:
      return state;
  }
};

export default photographyReducer;
