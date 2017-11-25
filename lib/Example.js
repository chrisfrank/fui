import React from "react";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import styled from "styled-components";
import Ipsum from "./Ipsum";

import { PanelLayout, Panel } from "./PanelLayout";

var RecursivePanel = function RecursivePanel(_ref) {
  var _ref$baseURL = _ref.baseURL,
      baseURL = _ref$baseURL === undefined ? "" : _ref$baseURL,
      layout = _ref.layout,
      referrer = _ref.referrer;
  return React.createElement(
    "div",
    null,
    React.createElement(Panel, Object.assign({}, layout, {
      render: function render(width) {
        return React.createElement(
          "div",
          { style: { padding: "1em" } },
          React.createElement(
            "h1",
            null,
            "I am a panel that knows about its width."
          ),
          React.createElement(
            "p",
            null,
            "Width = ",
            width
          ),
          typeof referrer === "string" && React.createElement(
            Link,
            { to: referrer },
            "prev"
          ),
          React.createElement(
            Link,
            { to: baseURL + "/next" },
            "next"
          ),
          React.createElement(Ipsum, null)
        );
      }
    })),
    React.createElement(Route, {
      path: baseURL + "/next",
      render: function render(r) {
        return React.createElement(RecursivePanel, {
          baseURL: r.match.url,
          layout: layout,
          referrer: baseURL
        });
      }
    })
  );
};

var App = function App() {
  return React.createElement(
    Router,
    null,
    React.createElement(
      PanelLayout,
      { max: 4 },
      function (layout) {
        return React.createElement(RecursivePanel, { layout: layout });
      }
    )
  );
};

export default App;