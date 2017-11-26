var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _templateObject = _taggedTemplateLiteral(["\n  0% {\n    transform: translate3d(50%, 0, 0);\n    opacity: 0;\n  }\n  100% {\n    transform: translate3d(0,0,0);\n    opacity: 1;\n  }\n"], ["\n  0% {\n    transform: translate3d(50%, 0, 0);\n    opacity: 0;\n  }\n  100% {\n    transform: translate3d(0,0,0);\n    opacity: 1;\n  }\n"]),
    _templateObject2 = _taggedTemplateLiteral(["\n  overflow-x: hidden;\n  overflow-y: auto;\n  -webkit-overflow-scrolling: touch;\n  box-sizing: border-box;\n  transition: all 0.3s;\n  flex: 1;\n"], ["\n  overflow-x: hidden;\n  overflow-y: auto;\n  -webkit-overflow-scrolling: touch;\n  box-sizing: border-box;\n  transition: all 0.3s;\n  flex: 1;\n"]),
    _templateObject3 = _taggedTemplateLiteral(["\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  display: flex;\n  flex-direction: column;\n  overflow: hidden;\n  background-color: white;\n  transition-property: filter, transform, left, width;\n  transition-duration: 0.5s;\n  animation: ", ";\n"], ["\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  display: flex;\n  flex-direction: column;\n  overflow: hidden;\n  background-color: white;\n  transition-property: filter, transform, left, width;\n  transition-duration: 0.5s;\n  animation: ", ";\n"]);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

import React, { Component } from "react";
import PropTypes from "prop-types";
import { default as styled, keyframes } from "styled-components";
import { sumArray } from './Tree';

var entrance = keyframes(_templateObject);

var Scroll = styled.div(_templateObject2);

var Element = styled.div(_templateObject3, function (props) {
  return props.animate ? entrance + " 0.5s" : 'none';
});

var Panel = function (_Component) {
  _inherits(Panel, _Component);

  function Panel(props, context) {
    _classCallCheck(this, Panel);

    var _this = _possibleConstructorReturn(this, (Panel.__proto__ || Object.getPrototypeOf(Panel)).call(this, props));

    _this.props.onMount(_this);
    _this.state = { canAnimate: props.max > 1 && props.displayed.length > 0 };

    _this.handleAnimationEnd = function () {
      _this.setState({ canAnimate: false });
    };
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
          max = _props.max,
          offscreen = _props.offscreen,
          ratio = _props.ratio,
          scale = _props.scale;

      if (offscreen === this && max > 1) return this.renderElement({
        animate: false,
        brightness: 1 - displayed.length * 0.03,
        offset: -baseWidth / 2,
        width: baseWidth
      });

      var index = displayed.length === 0 ? 0 : displayed.indexOf(this);
      if (index === -1) return null;

      var width = baseWidth * Math.pow(ratio, index);
      var offset = index === 0 ? 0 : baseWidth * sumArray(scale.slice(0, index));
      var brightness = 1 - (scale.length - index - 1) * 0.03;

      return this.renderElement({
        animate: this.state.canAnimate,
        brightness: brightness,
        offset: offset,
        width: width
      });
    }
  }, {
    key: "renderElement",
    value: function renderElement(_ref) {
      var animate = _ref.animate,
          brightness = _ref.brightness,
          offset = _ref.offset,
          width = _ref.width;
      var _props2 = this.props,
          children = _props2.children,
          render = _props2.render;

      var style = {
        width: width + "%",
        left: offset + "%",
        filter: "brightness(" + brightness + ")"
      };
      return React.createElement(
        Element,
        {
          onAnimationEnd: this.handleAnimationEnd,
          animate: animate,
          className: "panel",
          style: style
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
  max: PropTypes.number.isRequired,
  offscreen: PropTypes.any,
  onMount: PropTypes.func.isRequired,
  onUnmount: PropTypes.func.isRequired,
  ratio: PropTypes.number.isRequired,
  scale: PropTypes.array.isRequired
};

export default Panel;