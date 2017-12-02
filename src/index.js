// this is create-react-app's index.js file
// find fui's index.js at fui/index.js
import React from 'react';
import ReactDOM from 'react-dom';

import { Form, Nested, ReactRouter, Responsive, Standalone } from './examples';

const routes = {
  '/form': Form,
  '/nested': Nested,
  '/recursive-via-react-router': ReactRouter,
  '/recursive-via-component-state': Standalone,
  '/responsive': Responsive
};

const Index = () => (
  <div style={{ padding: '1em' }}>
    <h1>React Panel Tree</h1>
    <h2>Examples</h2>
    <ul>
      {Object.keys(routes).map(route => (
        <li key={route}>
          <a href={route}>{route}</a>
        </li>
      ))}
    </ul>
  </div>
);

const App = () => {
  const { pathname } = window.location;
  const match = Object.keys(routes).find(elem => pathname.indexOf(elem) !== -1);
  const Example = routes[match] || Index;
  return <Example baseURL={match} />;
};

ReactDOM.render(<App />, document.getElementById('root'));
