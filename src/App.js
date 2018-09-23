import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import Home from './containers/Home/Home';

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
          <Route exact path={'/'} component={Home} />
        </Switch>
      </Layout>
    );
  }
}

export default App;
