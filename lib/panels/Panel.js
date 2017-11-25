var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _templateObject = _taggedTemplateLiteral(["\n  0% {\n    transform: translate3d(-50%, 0, 0);\n    opacity: 0;\n  }\n  100% {\n    transform: translate3d(0,0,0);\n    opacity: 1;\n  }\n"], ["\n  0% {\n    transform: translate3d(-50%, 0, 0);\n    opacity: 0;\n  }\n  100% {\n    transform: translate3d(0,0,0);\n    opacity: 1;\n  }\n"]),
    _templateObject2 = _taggedTemplateLiteral(["\n  overflow-x: hidden;\n  overflow-y: auto;\n  -webkit-overflow-scrolling: touch;\n  box-sizing: border-box;\n  transition: all 0.3s;\n  flex: 1;\n"], ["\n  overflow-x: hidden;\n  overflow-y: auto;\n  -webkit-overflow-scrolling: touch;\n  box-sizing: border-box;\n  transition: all 0.3s;\n  flex: 1;\n"]),
    _templateObject3 = _taggedTemplateLiteral(["\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  display: flex;\n  flex-direction: column;\n  overflow: hidden;\n  background-color: white;\n  transition-property: filter, transform, left, width;\n  transition-duration: 0.5s;\n  width: ", "%;\n  left: ", "%;\n  filter: brightness(", ");\n  animation: ", ";\n"], ["\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  display: flex;\n  flex-direction: column;\n  overflow: hidden;\n  background-color: white;\n  transition-property: filter, transform, left, width;\n  transition-duration: 0.5s;\n  width: ", "%;\n  left: ", "%;\n  filter: brightness(", ");\n  animation: ", ";\n"]);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

import React, { Component } from "react";
import PropTypes from "prop-types";
import { default as styled, keyframes } from "styled-components";
import { sumArray } from './Layout';

var entrance = keyframes(_templateObject);

var Scroll = styled.div(_templateObject2);

var Element = styled.div(_templateObject3, function (props) {
  return props.width;
}, function (props) {
  return props.offset;
}, function (props) {
  return props.brightness;
}, function (props) {
  return props.animate ? entrance + " 0.5s" : 'none';
});

var Panel = function (_Component) {
  _inherits(Panel, _Component);

  function Panel(props, context) {
    _classCallCheck(this, Panel);

    var _this = _possibleConstructorReturn(this, (Panel.__proto__ || Object.getPrototypeOf(Panel)).call(this, props));

    _this.props.onMount(_this);
    return _this;
  }

  _createClass(Panel, [{
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.props.onUnmount(this);
    }
  }, {
    key: "render",
    value: function render() {
      var _props = this.props,
          baseWidth = _props.baseWidth,
          displayed = _props.displayed,
          offscreen = _props.offscreen,
          scale = _props.scale,
          scalers = _props.scalers;

      if (offscreen === this) return this.renderElement({
        brightness: 1 - displayed.length * 0.03,
        offset: -baseWidth,
        width: baseWidth
      });

      var index = displayed.indexOf(this);
      if (index === -1) return null;

      var width = baseWidth * Math.pow(scale, index);
      var offset = index === 0 ? 0 : baseWidth * sumArray(scalers.slice(0, index));
      var brightness = 1 - (scalers.length - index - 1) * 0.03;

      return this.renderElement({ brightness: brightness, index: index, offset: offset, width: width });
    }
  }, {
    key: "renderElement",
    value: function renderElement(_ref) {
      var brightness = _ref.brightness,
          index = _ref.index,
          offset = _ref.offset,
          width = _ref.width;
      var _props2 = this.props,
          children = _props2.children,
          render = _props2.render;

      return React.createElement(
        Element,
        {
          className: "panel",
          offset: offset,
          width: width,
          brightness: brightness,
          animate: index > 0
        },
        React.createElement(
          Scroll,
          null,
          render ? render(width / 100 * window.innerWidth) : children
        )
      );
    }
  }]);

  return Panel;
}(Component);

Panel.propTypes = {
  baseWidth: PropTypes.number.isRequired,
  displayed: PropTypes.array.isRequired,
  offscreen: PropTypes.any,
  onMount: PropTypes.func.isRequired,
  onUnmount: PropTypes.func.isRequired,
  scale: PropTypes.number.isRequired,
  scalers: PropTypes.array.isRequired
};

export default Panel;