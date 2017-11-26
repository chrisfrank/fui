import React from 'react';
import { BrowserRouter } from "react-router-dom";
import { RecursiveRoutePanel } from './Router';
import { PanelTree } from '../fui';

const Responsive = ({ baseURL }) => (
  <BrowserRouter>
    <PanelTree max={[1, 3, 4]}>
      {tree => <RecursiveRoutePanel baseURL={baseURL} tree={tree} />}
    </PanelTree>
  </BrowserRouter>
);

export default Responsive;;
