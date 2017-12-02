import React from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import Panel from '../fui/Nested.js';

const Example = ({ baseURL, ...props }) => (
  <Panel
    {...props}
    render={panel => (
      <div>
        <h1>I am the content of this panel</h1>
        <h2>{baseURL}</h2>
        <Link to={`${baseURL}/next`}>Next Panel</Link>
      </div>
    )}
  >
    {panel => (
      <Route
        path={`${baseURL}/next`}
        render={r => <Example baseURL={r.match.url} {...panel} />}
      />
    )}
  </Panel>
);

const App = props => (
  <Router>
    <Example {...props} />
  </Router>
);

export default App;
