import React from 'react';
import ReactDOM from 'react-dom';
import Standalone from '../Standalone';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(<Standalone />).toJSON();
  expect(tree).toMatchSnapshot();
});
