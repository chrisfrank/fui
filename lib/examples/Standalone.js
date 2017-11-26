var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from "react";
import { Panel, PanelTree } from '../fui/Panel';
import LoremIpsum from './LoremIpsum';

var style = { padding: "1em" };

var StateExample = function (_Component) {
  _inherits(StateExample, _Component);

  function StateExample(props) {
    _classCallCheck(this, StateExample);

    var _this = _possibleConstructorReturn(this, (StateExample.__proto__ || Object.getPrototypeOf(StateExample)).call(this, props));

    _this.state = { open: false };

    _this.handleToggle = function (event) {
      event.preventDefault();
      _this.setState(function (prevState) {
        return { open: !prevState.open };
      });
    };
    return _this;
  }

  _createClass(StateExample, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          onHide = _props.onHide,
          tree = _props.tree;

      var label = this.state.open ? "Hide" : "Show";
      return React.createElement(
        'div',
        null,
        React.createElement(
          Panel,
          tree,
          React.createElement(
            'div',
            { style: style },
            React.createElement(
              'h1',
              null,
              'Recursive Panels'
            ),
            React.createElement(
              'p',
              null,
              'via component state'
            ),
            React.createElement(
              'p',
              null,
              onHide ? React.createElement(
                'button',
                { onClick: onHide },
                'Hide this'
              ) : React.createElement(
                'a',
                { href: '/' },
                'Back to examples'
              )
            ),
            React.createElement(
              'p',
              null,
              React.createElement(
                'button',
                { onClick: this.handleToggle },
                label,
                ' next'
              )
            ),
            React.createElement(LoremIpsum, null)
          )
        ),
        this.state.open && React.createElement(StateExample, { tree: tree, onHide: this.handleToggle })
      );
    }
  }]);

  return StateExample;
}(Component);

var Standalone = function Standalone() {
  return React.createElement(PanelTree, {
    render: function render(tree) {
      return React.createElement(StateExample, { tree: tree });
    }
  });
};

export default Standalone;