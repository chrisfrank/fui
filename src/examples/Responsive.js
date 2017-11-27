import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { RecursiveRoutePanel } from './Router';
import { Breakpoints, PanelTree } from '../fui';

const columns = [1, 2, 2, 2, 3];

const Responsive = ({ baseURL }) => (
  <BrowserRouter>
    <Breakpoints>
      {breakpoint => (
        <PanelTree max={columns[breakpoint]}>
          {tree => <RecursiveRoutePanel baseURL={baseURL} tree={tree} />}
        </PanelTree>
      )}
    </Breakpoints>
  </BrowserRouter>
);

export default Responsive;
