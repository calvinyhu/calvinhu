import { AppState } from './app.models';
import { SET_FEATURE_FLAGS, AppActions } from '../../actions/app/app.models';

const INITIAL_APP_STATE: AppState = {
  featureFlags: {},
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
