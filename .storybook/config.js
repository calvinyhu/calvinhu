import { addDecorator, configure } from '@storybook/react';

import withContainer from './components/Container/decorator';

// automatically import all files ending in *.stories.js
const req = require.context('../src', true, /\.stories\.js$/);
const loadStories = () => req.keys().forEach(filename => req(filename));

addDecorator(withContainer);

configure(loadStories, module);
