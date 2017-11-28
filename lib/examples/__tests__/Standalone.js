import React from 'react';
import ReactDOM from 'react-dom';
import Standalone from '../Standalone';
import renderer from 'react-test-renderer';

it('renders correctly', function () {
  var tree = renderer.create(React.createElement(Standalone, null)).toJSON();
  expect(tree).toMatchSnapshot();
});