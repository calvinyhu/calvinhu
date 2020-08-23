import React, { lazy, Suspense } from 'react';
import { Router } from '@reach/router';

const HomeLayout = lazy(() => import('components/HomeLayout/HomeLayout'));
const PhotoLayout = lazy(() => import('components/PhotoLayout/PhotoLayout'));

const App = () => {
  return (
    <Suspense fallback={<div>{':)'}</div>}>
      <Router>
        <HomeLayout path="/*" />
        <PhotoLayout path="photo/*" />
      </Router>
    </Suspense>
  );
};

export default App;
