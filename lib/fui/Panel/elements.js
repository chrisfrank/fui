var _templateObject = _taggedTemplateLiteral(['\n  0% {\n    transform: translate3d(50%, 0, 0);\n    opacity: 0;\n  }\n  100% {\n    transform: translate3d(0,0,0);\n    opacity: 1;\n  }\n'], ['\n  0% {\n    transform: translate3d(50%, 0, 0);\n    opacity: 0;\n  }\n  100% {\n    transform: translate3d(0,0,0);\n    opacity: 1;\n  }\n']),
    _templateObject2 = _taggedTemplateLiteral(['\n  overflow-x: hidden;\n  overflow-y: auto;\n  -webkit-overflow-scrolling: touch;\n  box-sizing: border-box;\n  transition: all 0.3s;\n  flex: 1;\n'], ['\n  overflow-x: hidden;\n  overflow-y: auto;\n  -webkit-overflow-scrolling: touch;\n  box-sizing: border-box;\n  transition: all 0.3s;\n  flex: 1;\n']),
    _templateObject3 = _taggedTemplateLiteral(['\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  display: flex;\n  flex-direction: column;\n  overflow: hidden;\n  transition-property: filter, left, width;\n  transition-duration: ', 's;\n  animation: ', ';\n'], ['\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  display: flex;\n  flex-direction: column;\n  overflow: hidden;\n  transition-property: filter, left, width;\n  transition-duration: ', 's;\n  animation: ', ';\n']);

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

import { default as styled, keyframes } from 'styled-components';

var entrance = keyframes(_templateObject);

var ScrollDiv = styled.div(_templateObject2);

var PanelDiv = styled.div(_templateObject3, function (props) {
  return props.transition;
}, function (props) {
  return props.animate ? entrance + ' ' + props.transition + 's' : 'none';
});

export { entrance, PanelDiv, ScrollDiv };