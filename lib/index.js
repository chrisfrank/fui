var _templateObject = _taggedTemplateLiteral(['\n  ', '\n'], ['\n  ', '\n']);

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

import React from 'react';
import ReactDOM from 'react-dom';
import Example from './Example';
import { injectGlobal } from 'styled-components';
import reset from 'styled-reset';

injectGlobal(_templateObject, reset);

ReactDOM.render(React.createElement(Example, null), document.getElementById('root'));