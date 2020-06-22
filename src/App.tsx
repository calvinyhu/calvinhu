import React from 'react';
import { Router, Redirect } from '@reach/router';

import HomeLayout from 'components/HomeLayout/HomeLayout';
import PhotoLayout from 'components/PhotoLayout/PhotoLayout';
import Home from 'components/Home/Home';
import About from 'components/About/About';
import Photography from 'components/Photography/Photography';

const App = () => {
  return (
    <Router>
      <HomeLayout path="/">
        <Home path="/" />
        <About path="about" />
      </HomeLayout>

      <PhotoLayout path="photo">
        <Photography path="travel" />
        <Photography path="automotive" />
        <Photography path="portraits" />
        <Redirect from="/" to="travel" />
      </PhotoLayout>
    </Router>
  );
};

export default App;
