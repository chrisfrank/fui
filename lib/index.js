// this is create-react-app's index.js file
// find fui's index.js at fui/index.js
import React from 'react';
import ReactDOM from 'react-dom';

import { ReactRouter, Responsive, Standalone } from './examples';

var routes = {
  "/recursive-via-react-router": ReactRouter,
  "/recursive-via-component-state": Standalone,
  "/responsive": Responsive
};

var Index = function Index() {
  return React.createElement(
    'div',
    { style: { padding: "1em" } },
    React.createElement(
      'h1',
      null,
      'React Panel Tree'
    ),
    React.createElement(
      'h2',
      null,
      'Examples'
    ),
    React.createElement(
      'ul',
      null,
      Object.keys(routes).map(function (route) {
        return React.createElement(
          'li',
          { key: route },
          React.createElement(
            'a',
            { href: route },
            route
          )
        );
      })
    )
  );
};

var App = function App() {
  var pathname = window.location.pathname;

  var match = Object.keys(routes).find(function (elem) {
    return pathname.indexOf(elem) !== -1;
  });
  var Example = routes[match] || Index;
  return React.createElement(Example, { baseURL: match });
};

ReactDOM.render(React.createElement(App, null), document.getElementById('root'));