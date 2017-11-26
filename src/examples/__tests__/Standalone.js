import React from 'react';
import ReactDOM from 'react-dom';
import Standalone from '../Standalone';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Standalone />, div);
});
