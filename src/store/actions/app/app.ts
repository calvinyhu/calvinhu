import { FeatureFlags } from 'store/reducers/app/app.models';

import { SET_FEATURE_FLAGS, SetFeatureFlagsAction } from './app.models';

export const setFeatureFlags = (
  featureFlags: FeatureFlags,
): SetFeatureFlagsAction => ({
  type: SET_FEATURE_FLAGS,
  featureFlags,
});
