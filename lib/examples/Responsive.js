import React from 'react';
import { BrowserRouter } from "react-router-dom";
import { RecursiveRoutePanel } from './Router';
import { PanelTree } from '../fui';

var Responsive = function Responsive(_ref) {
  var baseURL = _ref.baseURL;
  return React.createElement(
    BrowserRouter,
    null,
    React.createElement(
      PanelTree,
      { max: [1, 3, 4] },
      function (tree) {
        return React.createElement(RecursiveRoutePanel, { baseURL: baseURL, tree: tree });
      }
    )
  );
};

export default Responsive;;