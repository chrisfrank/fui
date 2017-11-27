import React from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import LoremIpsum from './LoremIpsum';

import { PanelTree, Panel } from '../fui';

const RecursiveRoutePanel = ({ baseURL, referrer, tree }) => (
  <div>
    <Panel
      {...tree}
      render={panel => (
        <div style={{ padding: '1em' }}>
          <h1>Recursive Panels</h1>
          <h3>via React Router</h3>
          {typeof referrer === 'string' ? (
            <p>
              <Link to={referrer}>prev panel</Link>
            </p>
          ) : (
            <p>
              <a href="/">Back to examples</a>
            </p>
          )}
          <p>
            <Link to={`${baseURL}/panel`}>next panel</Link>
          </p>
          <p>panel width: {panel.width.px}</p>
          <p>panel url: {baseURL}</p>
          <LoremIpsum />
        </div>
      )}
    />
    <Route
      path={`${baseURL}/panel`}
      render={r => (
        <RecursiveRoutePanel
          baseURL={r.match.url}
          tree={tree}
          referrer={baseURL}
        />
      )}
    />
  </div>
);

const RouterExample = ({ baseURL }) => (
  <Router>
    <PanelTree max={2}>
      {tree => <RecursiveRoutePanel baseURL={baseURL} tree={tree} />}
    </PanelTree>
  </Router>
);

export default RouterExample;
export { RecursiveRoutePanel };
