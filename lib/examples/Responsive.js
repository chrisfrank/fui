import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { RecursiveRoutePanel } from './Router';
import { LayoutSize, PanelTree } from '../fui';

var columns = [1, 2, 3];

var Responsive = function Responsive(_ref) {
  var baseURL = _ref.baseURL;
  return React.createElement(
    BrowserRouter,
    null,
    React.createElement(
      LayoutSize,
      null,
      function (size) {
        return React.createElement(
          PanelTree,
          { max: columns[size] || columns[columns.length] },
          function (tree) {
            return React.createElement(RecursiveRoutePanel, { baseURL: baseURL, tree: tree });
          }
        );
      }
    )
  );
};

export default Responsive;