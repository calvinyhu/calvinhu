import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { fetchFeatureFlags } from 'api/api';
import { setFeatureFlags } from 'store/actions/app/app';
import { FeatureFlags } from 'store/reducers/app/app.models';

let fetched = false;
export const useGetFeatureFlags = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getFeatureFlags = async () => {
      const featureFlags = (await fetchFeatureFlags()) as FeatureFlags;
      dispatch(setFeatureFlags(featureFlags));
    };

    if (!fetched) {
      getFeatureFlags();
      fetched = true;
    }
  });
};
