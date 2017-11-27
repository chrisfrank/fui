var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { entrance, PanelDiv, ScrollDiv } from './elements';
import { sumArray } from './Tree';

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
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.props.onUnmount(this);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          baseWidth = _props.baseWidth,
          displayed = _props.displayed,
          max = _props.max,
          offscreen = _props.offscreen,
          ratio = _props.ratio,
          scale = _props.scale;
      // render element offscreen

      if (offscreen === this && max > 1) return this.renderElement({
        animate: false,
        brightness: 1 - displayed.length * 0.03,
        offset: -baseWidth / 2,
        width: baseWidth
      });

      var index = displayed.indexOf(this);
      // for performance reasons, render nothing if this panel isn't
      // in the displayed stack
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
    key: 'renderElement',
    value: function renderElement(_ref) {
      var animate = _ref.animate,
          brightness = _ref.brightness,
          offset = _ref.offset,
          width = _ref.width;
      var _props2 = this.props,
          bg = _props2.bg,
          children = _props2.children,
          color = _props2.color,
          displayed = _props2.displayed,
          index = _props2.index,
          render = _props2.render;

      var style = {
        backgroundColor: bg,
        color: color,
        filter: 'brightness(' + brightness + ')',
        left: offset + '%',
        width: width + '%'
      };
      var passedProps = {
        isLast: index === displayed.length - 1,
        width: {
          percent: width,
          px: width / 100 * window.innerWidth
        }
      };
      return React.createElement(
        PanelDiv,
        {
          animate: animate,
          className: 'panel',
          'data-index': index,
          'data-last': index === this.props.displayed.length - 1 ? true : null,
          onAnimationEnd: this.handleAnimationEnd,
          style: style,
          transition: this.props.transition
        },
        React.createElement(
          ScrollDiv,
          null,
          render ? render(passedProps) : children
        )
      );
    }
  }]);

  return Panel;
}(Component);

Panel.propTypes = {
  baseWidth: PropTypes.number.isRequired,
  bg: PropTypes.string,
  color: PropTypes.string,
  displayed: PropTypes.array.isRequired,
  max: PropTypes.number.isRequired,
  offscreen: PropTypes.any,
  onMount: PropTypes.func.isRequired,
  onUnmount: PropTypes.func.isRequired,
  ratio: PropTypes.number.isRequired,
  transition: PropTypes.number.isRequired,
  scale: PropTypes.array.isRequired
};

Panel.defaultProps = {
  bg: '#fff',
  color: '#000',
  offscreen: null
};

export default Panel;