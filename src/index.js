import React from 'react';
import ReactDOM from 'react-dom';
import Example from './Example';
import { injectGlobal } from 'styled-components'
import reset from 'styled-reset';

injectGlobal`
  ${reset}
`

ReactDOM.render(<Example />, document.getElementById('root'));
