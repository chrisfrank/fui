var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import { Component } from 'react';
import PropTypes from 'prop-types';

var updateMatches = function updateMatches(state) {
  return {
    matches: state.queries.map(function (q) {
      return q.matches;
    })
  };
};

var LayoutSize = function (_Component) {
  _inherits(LayoutSize, _Component);

  function LayoutSize(props) {
    _classCallCheck(this, LayoutSize);

    var _this = _possibleConstructorReturn(this, (LayoutSize.__proto__ || Object.getPrototypeOf(LayoutSize)).call(this, props));

    _this.state = {
      matches: [],
      queries: []
    };
    _this.handleUpdate = function () {
      _this.setState(updateMatches);
    };
    return _this;
  }

  _createClass(LayoutSize, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _this2 = this;

      var queries = this.props.breakpoints.map(function (breakpoint) {
        var q = window.matchMedia('(min-width: ' + breakpoint + 'em)');
        q.addListener(_this2.handleUpdate);
        return q;
      });
      this.setState({ queries: queries, matches: queries.map(function (q) {
          return q.matches;
        }) });
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      var _this3 = this;

      this.state.queries.forEach(function (q) {
        q.removeListener(_this3.handleUpdate);
      });
    }
  }, {
    key: 'render',
    value: function render() {
      // prepend a match for sizes below the smallest breakpoint
      var size = [true].concat(this.state.matches).lastIndexOf(true);
      return this.props.children(size);
    }
  }]);

  return LayoutSize;
}(Component);

LayoutSize.propTypes = {
  breakpoints: PropTypes.arrayOf(PropTypes.number),
  children: PropTypes.func.isRequired
};

LayoutSize.defaultProps = {
  breakpoints: [32, 48, 64, 80]
};

export default LayoutSize;