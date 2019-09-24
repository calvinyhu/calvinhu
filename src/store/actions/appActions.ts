import { FeatureFlags } from 'store/reducers/appReducer.models';

import { SET_FEATURE_FLAGS, SetFeatureFlagsAction } from './appActions.models';

export const setFeatureFlags = (
  featureFlags: FeatureFlags,
): SetFeatureFlagsAction => ({
  type: SET_FEATURE_FLAGS,
  featureFlags,
});
