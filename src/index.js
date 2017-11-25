// this is create-react-app's index.js file
// find fui's index.js at fui/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import Example from './Example';
import { injectGlobal } from 'styled-components'
import reset from 'styled-reset';

injectGlobal`
  ${reset}
`

ReactDOM.render(<Example />, document.getElementById('root'));
