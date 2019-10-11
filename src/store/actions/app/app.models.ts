import { FeatureFlags } from 'store/reducers/app/app.models';

export const SET_FEATURE_FLAGS = 'SET_FEATURE_FLAGS';

export interface SetFeatureFlagsAction {
  type: typeof SET_FEATURE_FLAGS;
  featureFlags: FeatureFlags;
}

export type AppActions = SetFeatureFlagsAction;
