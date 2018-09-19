import React, { Component } from 'react';

import Layout from './hoc/Layout/Layout';
import Home from './containers/Home/Home';

// TODO:
// Add more shmack content
// Add photos to firebase storage
// Make sure to upload photos that are large and small
// Add infinite scrolling to photography page
// Add dragon flag video as background

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
