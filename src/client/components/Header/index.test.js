import React from 'react';
import renderer from 'react-test-renderer';
import { navigationLinks } from '../../constants';
import Header from '.';

const basicProps = {
  navigationLinks,
  currentPathname: '/photos'
};

describe('<Header />', () => {
  it('renders correctly', () => {
    const component = renderer.create(
      <Header {...basicProps} />
    );

    expect(component.toJSON()).toMatchSnapshot();
  });
});
