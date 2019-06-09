import React from 'react';
import { makeDecorator } from '@storybook/addons';

import Container from './Container';

const defaultOptions = {
  disabled: false,
  center: true,
};

const withContainer = makeDecorator({
  name: 'withContainer',
  parameterName: 'container',
  wrapper: (getStory, context, { options, parameters }) => {
    const containerOptions = parameters || options || {};

    const containerProps = {
      ...defaultOptions,
      ...containerOptions,
    };

    return <Container {...containerProps}>{getStory(context)}</Container>;
  },
});

export default withContainer;
