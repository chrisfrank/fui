import { Component } from 'react';
import PropTypes from 'prop-types';

class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      panels: [],
    };

    this.handlePanelMount = (panel) => {
      this.setState(({ panels }) => {
        panels.push(panel);
        return { panels };
      });
    };

    this.handlePanelUnmount = (panel) => {
      this.setState(({ panels }) => {
        const index = panels.indexOf(panel)
        panels.splice(index, 1);
        return { panels };
      });
    };
  }

  getChildContext() {
    return {
      panels: {
        list: this.state.panels.slice(-this.props.max),
        onMount: this.handlePanelMount,
        onUnmount: this.handlePanelUnmount,
        scale: 1.5,
      },
    };
  }

  render() { return this.props.children }
}

Layout.defaultProps = {
  max: 3,
};

Layout.childContextTypes = {
  panels: PropTypes.shape({
    list: PropTypes.array.isRequired,
    onMount: PropTypes.func.isRequired,
    onUnmount: PropTypes.func.isRequired,
    scale: PropTypes.number.isRequired,
  }),
};

export default Layout;
