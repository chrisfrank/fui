import React from 'react';
import ReactDOM from 'react-dom';
import Standalone from '../Standalone';

it('renders without crashing', function () {
  var div = document.createElement('div');
  ReactDOM.render(React.createElement(Standalone, null), div);
});