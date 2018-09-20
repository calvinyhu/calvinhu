import React, { Component } from 'react';

import Layout from './hoc/Layout/Layout';
import Home from './containers/Home/Home';

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
        <Home />
      </Layout>
    );
  }
}

export default App;
