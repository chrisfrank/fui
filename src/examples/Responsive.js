import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { RecursiveRoutePanel } from './Router';
import { LayoutSize, PanelTree } from '../fui';

const columns = [1, 2, 3];

const Responsive = ({ baseURL }) => (
  <BrowserRouter>
    <LayoutSize>
      {size => (
        <PanelTree max={columns[size] || columns[columns.length]}>
          {tree => <RecursiveRoutePanel baseURL={baseURL} tree={tree} />}
        </PanelTree>
      )}
    </LayoutSize>
  </BrowserRouter>
);

export default Responsive;
