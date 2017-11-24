import React from "react";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import styled from "styled-components";
import Ipsum from "./Ipsum";

import { PanelLayout, Panel } from "./PanelLayout";

const RecursivePanel = ({ baseURL = "", layout, referrer }) => (
  <div>
    <Panel
      {...layout}
      render={width => (
        <div style={{ padding: "1em" }}>
          <h1>I am a panel that knows about its width.</h1>
          <p>Width = {width}</p>
          {typeof referrer === "string" && <Link to={referrer}>prev</Link>}
          <Link to={`${baseURL}/next`}>next</Link>
          <Ipsum />
        </div>
      )}
    />
    <Route
      path={`${baseURL}/next`}
      render={r => (
        <RecursivePanel
          baseURL={r.match.url}
          layout={layout}
          referrer={baseURL}
        />
      )}
    />
  </div>
);

const App = () => (
  <Router>
    <PanelLayout max={4}>
      {layout => <RecursivePanel layout={layout} />}
    </PanelLayout>
  </Router>
);

export default App;
