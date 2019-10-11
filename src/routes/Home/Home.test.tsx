import React from 'react';
import { shallow } from 'enzyme';

import Home from './Home';
import Cover from 'components/Cover/Cover';
import Milestone from 'components/Milestone/Milestone';

describe('<Home />', () => {
  it('should render <Cover />', () => {
    const wrapper = shallow(<Home />);
    expect(wrapper.find(Cover).length).toEqual(1);
  });

  it('should render <Milestone />', () => {
    const wrapper = shallow(<Home />);
    expect(wrapper.find(Milestone).length).toEqual(3);
  });
});
