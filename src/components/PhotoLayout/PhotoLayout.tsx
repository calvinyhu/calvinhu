import React from 'react';
import { Link } from '@reach/router';

const PhotoLayout = (props: any) => (
  <>
    <div>
      <Link style={{ zIndex: 1000 }} to="/">
        Home
      </Link>
    </div>
    {props.children}
  </>
);

export default PhotoLayout;
