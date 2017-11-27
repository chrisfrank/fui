import React from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import LoremIpsum from './LoremIpsum';

import { PanelTree, Panel } from '../fui';

var RecursiveRoutePanel = function RecursiveRoutePanel(_ref) {
  var baseURL = _ref.baseURL,
      referrer = _ref.referrer,
      tree = _ref.tree;
  return React.createElement(
    'div',
    null,
    React.createElement(Panel, Object.assign({}, tree, {
      render: function render(panel) {
        return React.createElement(
          'div',
          { style: { padding: '1em' } },
          React.createElement(
            'h1',
            null,
            'Recursive Panels'
          ),
          React.createElement(
            'h3',
            null,
            'via React Router'
          ),
          typeof referrer === 'string' ? React.createElement(
            'p',
            null,
            React.createElement(
              Link,
              { to: referrer },
              'prev panel'
            )
          ) : React.createElement(
            'p',
            null,
            React.createElement(
              'a',
              { href: '/' },
              'Back to examples'
            )
          ),
          React.createElement(
            'p',
            null,
            React.createElement(
              Link,
              { to: baseURL + '/panel' },
              'next panel'
            )
          ),
          React.createElement(
            'p',
            null,
            'panel width: ',
            panel.width.px
          ),
          React.createElement(
            'p',
            null,
            'panel url: ',
            baseURL
          ),
          React.createElement(LoremIpsum, null)
        );
      }
    })),
    React.createElement(Route, {
      path: baseURL + '/panel',
      render: function render(r) {
        return React.createElement(RecursiveRoutePanel, {
          baseURL: r.match.url,
          tree: tree,
          referrer: baseURL
        });
      }
    })
  );
};

var RouterExample = function RouterExample(_ref2) {
  var baseURL = _ref2.baseURL;
  return React.createElement(
    Router,
    null,
    React.createElement(
      PanelTree,
      { max: 2 },
      function (tree) {
        return React.createElement(RecursiveRoutePanel, { baseURL: baseURL, tree: tree });
      }
    )
  );
};

export default RouterExample;
export { RecursiveRoutePanel };