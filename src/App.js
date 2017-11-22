import React from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import Panel from './Panel';

const App = () => (
  <Router>
    <div>
      <Route
        path="/"
        render={r => (
          <Panel id={r.match.url}>
            <h1>Hello</h1>
            <Link to="/world">Next</Link>
            <Link to="/world/etc">Last</Link>
          </Panel>
        )}
      />
      <Route
        path="/world"
        render={r => (
          <Panel id={r.match.url}>
            <Link to="/">prev</Link>
            <h1>World</h1>
            <Link to="/world/etc">Next</Link>
          </Panel>
        )}
      />
      <Route
        path="/world/etc"
        render={r => (
          <Panel id={r.match.url}>
            <Link to="/world">prev</Link>
            <h1>Etc</h1>
          </Panel>
        )}
      />
    </div>
  </Router>
);

export default App;
