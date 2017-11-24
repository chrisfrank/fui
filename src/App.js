import React from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import styled from 'styled-components';
import Ipsum from './Ipsum';

import { PanelLayout, Panel } from './fui-panels';

const Example = ({ match, referrer }) => {
  const baseURL = match.url === "/" ? "" : match.url;
  return (
    <div>
      <Panel>
        <div style={{ padding: '1em' }}>
          <h1>I am a panel.</h1>
          {referrer && <Link to={referrer}>prev</Link>}
          <Link to={`${baseURL}/next`}>next</Link>
          <Ipsum />
        </div>
      </Panel>
      <Route
        path={`${baseURL}/next`}
        render={r => (
          <Example {...r} referrer={match.url} />
        )}
      />
    </div>
  );
};

const App = () => (
  <Router>
    <PanelLayout>
      <Example match={{ url: '/' }} />
    </PanelLayout>
  </Router>
);

export default App;
