import { useSelector } from 'react-redux';

import { RootState } from 'store/reducers';

export const useFeatureFlagSelector = () =>
  useSelector((state: RootState) => state.app.featureFlags);

export const useIsOrderEnabled = () =>
  Boolean(useFeatureFlagSelector().orderEnabled);
export const useIsPhotosEnabled = () =>
  Boolean(useFeatureFlagSelector().photosEnabled);
