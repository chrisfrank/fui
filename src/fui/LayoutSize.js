import React, { Component } from 'react';
import PropTypes from 'prop-types';

const updateMatches = state => ({
  matches: state.queries.map(q => q.matches)
});

class LayoutSize extends Component {
  constructor(props) {
    super(props);
    this.state = {
      matches: [],
      queries: []
    };
    this.handleUpdate = () => {
      this.setState(updateMatches);
    };
  }

  componentWillMount() {
    const queries = this.props.breakpoints.map(breakpoint => {
      const q = window.matchMedia(`(min-width: ${breakpoint}em)`);
      q.addListener(this.handleUpdate);
      return q;
    });
    this.setState({ queries, matches: queries.map(q => q.matches) });
  }

  componentWillUnmount() {
    this.state.queries.forEach(q => {
      q.removeListener(this.handleUpdate);
    });
  }

  render() {
    // prepend a match for sizes below the smallest breakpoint
    const size = [true].concat(this.state.matches).lastIndexOf(true);
    return this.props.children(size);
  }
}

LayoutSize.propTypes = {
  breakpoints: PropTypes.arrayOf(PropTypes.number),
  children: PropTypes.func.isRequired
};

LayoutSize.defaultProps = {
  breakpoints: [32, 48, 64, 80]
};

export default LayoutSize;
