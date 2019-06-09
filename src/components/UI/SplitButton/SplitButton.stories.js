import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import SplitButton from './SplitButton';

const stories = storiesOf('SplitButton', module);

stories.add('with text', () => {
  const options = [{ href: '/', label: 'Home' }];
  return (
    <SplitButton
      handleMainAction={action('Clicked Main Action')}
      options={options}
    />
  );
});
