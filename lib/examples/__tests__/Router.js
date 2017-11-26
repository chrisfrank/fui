import React from 'react';
import ReactDOM from 'react-dom';
import Router from '../Router';

it('renders without crashing', function () {
  var div = document.createElement('div');
  ReactDOM.render(React.createElement(Router, null), div);
});