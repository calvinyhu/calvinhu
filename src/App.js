import React, { Component, lazy, Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Layout from './components/Layout/Layout';

const About = lazy(() => import('./routes/About/About'));
const Photography = lazy(() => import('./routes/Photography/Photography'));
const Home = lazy(() => import('./routes/Home/Home'));

class App extends Component {
  render() {
    return (
      <Layout>
        <Suspense fallback={<div />}>
          <Switch>
            <Route exact path={'/about'} component={About} />
            <Route exact path={'/photo'} component={Photography} />
            <Route exact path={'/'} component={Home} />

            <Redirect from="/photos" to="/photo" />
            <Redirect from="/photography" to="/photo" />

            <Redirect to="/" />
          </Switch>
        </Suspense>
      </Layout>
    );
  }
}

export default App;
