import { AppState } from './appReducer.models';
import { SET_FEATURE_FLAGS, AppActions } from '../actions/appActions.models';

const INITIAL_APP_STATE: AppState = {
  featureFlags: undefined,
};

const appReducer = (state = INITIAL_APP_STATE, action: AppActions) => {
  switch (action.type) {
    case SET_FEATURE_FLAGS:
      return {
        ...state,
        featureFlags: action.featureFlags,
      };
    default:
      return state;
  }
};

export default appReducer;
