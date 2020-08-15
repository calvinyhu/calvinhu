import React from 'react';
import { Router } from '@reach/router';

import HomeLayout from 'components/HomeLayout/HomeLayout';
import PhotoLayout from 'components/PhotoLayout/PhotoLayout';

const App = () => {
  return (
    <Router>
      <HomeLayout path="/*" />
      <PhotoLayout path="photo/*" />
    </Router>
  );
};

export default App;
