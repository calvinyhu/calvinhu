import React, { lazy, Suspense, useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { fetchFeatureFlags } from 'api/api';
import Layout from 'components/Layout/Layout';
import { setFeatureFlags } from 'store/actions/appActions';
import { FeatureFlags } from 'store/reducers/appReducer.models';
import { RootState } from 'store/reducers';

const About = lazy(() => import('routes/About/About'));
const Checkout = lazy(() => import('routes/Checkout/Checkout'));
const Order = lazy(() => import('routes/Order/Order'));
const Photography = lazy(() => import('routes/Photography/Photography'));
const Home = lazy(() => import('routes/Home/Home'));

const App = () => {
  const featureFlags = useSelector(
    (state: RootState) => state.app.featureFlags,
  );
  const isOrderEnabled = featureFlags && featureFlags.orderEnabled;
  const dispatch = useDispatch();

  useEffect(() => {
    const getFeatureFlags = async () => {
      const featureFlags = (await fetchFeatureFlags()) as FeatureFlags;
      dispatch(setFeatureFlags(featureFlags));
    };

    if (!featureFlags) getFeatureFlags();
  });

  return (
    <Layout>
      <Suspense fallback={<div />}>
        <Switch>
          <Route exact path="/about" component={About} />
          {isOrderEnabled && (
            <Route exact path="/checkout" component={Checkout} />
          )}
          {isOrderEnabled && <Route exact path="/order" component={Order} />}
          <Route exact path="/photo" component={Photography} />
          <Route exact path="/" component={Home} />

          <Redirect from="/photos" to="/photo" />
          <Redirect from="/photography" to="/photo" />

          <Redirect to="/" />
        </Switch>
      </Suspense>
    </Layout>
  );
};

export default App;
