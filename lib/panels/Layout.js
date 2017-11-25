var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _templateObject = _taggedTemplateLiteral(["\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  overflow: hidden;\n"], ["\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  overflow: hidden;\n"]);

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

import React, { Component } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

var sumArray = function sumArray() {
  var array = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  return array.reduce(function (a, b) {
    return a + b;
  }, 0);
};

var NoOverflow = styled.div(_templateObject);

var Layout = function (_Component) {
  _inherits(Layout, _Component);

  function Layout(props) {
    _classCallCheck(this, Layout);

    var _this = _possibleConstructorReturn(this, (Layout.__proto__ || Object.getPrototypeOf(Layout)).call(this, props));

    _this.state = { panels: [] };

    _this.handlePanelMount = function (panel) {
      _this.setState(function (prevState) {
        return {
          panels: prevState.panels.concat([panel])
        };
      });
    };

    _this.handlePanelUnmount = function (panel) {
      _this.setState(function (prevState) {
        var panels = prevState.panels.slice();
        var index = panels.indexOf(panel);
        panels.splice(index, 1);
        return { panels: panels };
      });
    };
    return _this;
  }

  _createClass(Layout, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          children = _props.children,
          max = _props.max,
          render = _props.render,
          scale = _props.scale;
      var panels = this.state.panels;

      var displayed = panels.slice(-max);
      var offscreen = panels[panels.length - max - 1];
      var scalers = [].concat(_toConsumableArray(Array(displayed.length))).map(function (x, i) {
        return Math.pow(scale, i);
      });
      var baseWidth = 100 / (sumArray(scalers) || 1);
      var passedProps = {
        baseWidth: baseWidth,
        displayed: displayed,
        offscreen: offscreen,
        onMount: this.handlePanelMount,
        onUnmount: this.handlePanelUnmount,
        scale: scale,
        scalers: scalers
      };
      return React.createElement(
        NoOverflow,
        null,
        render ? render(passedProps) : children(passedProps)
      );
    }
  }]);

  return Layout;
}(Component);

Layout.defaultProps = {
  children: function children() {},

  max: 3,
  render: null,
  scale: 1.5
};

Layout.propTypes = {
  children: PropTypes.func,
  render: PropTypes.func
};

export default Layout;
export { sumArray };