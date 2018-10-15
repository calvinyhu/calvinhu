import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import Home from './containers/Home/Home';
import Photography from './containers/Photography/Photography';

class App extends Component {
  render() {
    return (
      <Layout>
        <Switch>
          <Route exact path={'/photo'} component={Photography} />
          <Route exact path={'/'} component={Home} />
          <Redirect to="/" />
        </Switch>
      </Layout>
    );
  }
}

export default App;
