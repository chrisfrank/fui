import React from 'react';
import ReactDOM from 'react-dom';
import Example from '../Example';

it('renders without crashing', function () {
  var div = document.createElement('div');
  ReactDOM.render(React.createElement(Example, null), div);
});