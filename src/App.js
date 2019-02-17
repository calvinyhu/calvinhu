import React, { Component, lazy, Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';

const About = lazy(() => import('./containers/About/About'));
const Photography = lazy(() => import('./containers/Photography/Photography'));
const Home = lazy(() => import('./containers/Home/Home'));

class App extends Component {
  render() {
    return (
      <Layout>
        <Suspense fallback={<div />}>
          <Switch>
            <Route exact path={'/about'} component={About} />
            <Route exact path={'/photo'} component={Photography} />
            <Route exact path={'/'} component={Home} />
            <Redirect to="/" />
          </Switch>
        </Suspense>
      </Layout>
    );
  }
}

export default App;
