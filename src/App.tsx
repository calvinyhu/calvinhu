import React, { lazy, Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Layout from 'components/Layout/Layout';

const About = lazy(() => import('routes/About/About'));
const Checkout = lazy(() => import('routes/Checkout/Checkout'));
const Order = lazy(() => import('routes/Order/Order'));
const Photography = lazy(() => import('routes/Photography/Photography'));
const Home = lazy(() => import('routes/Home/Home'));

const App = () => (
  <Layout>
    <Suspense fallback={<div />}>
      <Switch>
        <Route exact path={'/about'} component={About} />
        {/* <Route exact path={'/checkout'} component={Checkout} /> */}
        {/* <Route exact path={'/order'} component={Order} /> */}
        <Route exact path={'/photo'} component={Photography} />
        <Route exact path={'/'} component={Home} />

        <Redirect from="/photos" to="/photo" />
        <Redirect from="/photography" to="/photo" />

        <Redirect to="/" />
      </Switch>
    </Suspense>
  </Layout>
);

export default App;
