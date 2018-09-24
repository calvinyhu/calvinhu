import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import Home from './containers/Home/Home';
import Photography from './containers/Photography/Photography';
import Fitness from './containers/Fitness/Fitness';

// FIXME:
// Remove auto load images for photography page (uses too much bandwidth)
// Reduce image file size load to reduce bandwidth usage on small devices
// TODO:
// Add more shmack content
// Add infinite scrolling to photography page
// Add dynamic image sizing and column adjustment
// Add dragon flag video as background
// Add routing redirection (entering path info after calvinyhu.com/ should not show that on path name)

class App extends Component {
  render() {
    return (
      <Layout>
        <Switch>
          <Route exact path={'/photo'} component={Photography} />
          <Route exact path={'/fitness'} component={Fitness} />
          <Route exact path={'/'} component={Home} />
          <Redirect to="/" />
        </Switch>
      </Layout>
    );
  }
}

export default App;
