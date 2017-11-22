import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { injectGlobal } from 'styled-components'
import reset from 'styled-reset';

injectGlobal`
  ${reset}
`

ReactDOM.render(<App />, document.getElementById('root'));
