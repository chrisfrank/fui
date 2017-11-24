import React, { Component } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const sumArray = (array = []) => array.reduce((a, b) => (a + b), 0);

const NoOverflow = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
`;

class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      panels: []
    };

    this.handlePanelMount = panel => {
      this.setState(({ panels }) => {
        panels.push(panel);
        return { panels };
      });
    };

    this.handlePanelUnmount = panel => {
      this.setState(({ panels }) => {
        const index = panels.indexOf(panel);
        panels.splice(index, 1);
        return { panels };
      });
    };
  }

  getChildContext() {
    const { panels } = this.state;
    const displayed = panels.slice(-this.props.max);
    const offscreen = panels[panels.length - this.props.max - 1];
    const scalers = [...Array(displayed.length)].map((x, i) =>
      Math.pow(this.props.scale, i)
    );
    const baseWidth = 100 / (sumArray(scalers) || 1);
    return {
      panels: {
        baseWidth,
        displayed,
        offscreen,
        onMount: this.handlePanelMount,
        onUnmount: this.handlePanelUnmount,
        scale: this.props.scale,
        scalers,
      }
    };
  }

  render() {
    return <NoOverflow>{this.props.children}</NoOverflow>;
  }
}

Layout.defaultProps = {
  max: 3,
  scale: 1.5
};

Layout.childContextTypes = {
  panels: PropTypes.shape({
    baseWidth: PropTypes.number.isRequired,
    displayed: PropTypes.array.isRequired,
    offscreen: PropTypes.any,
    onMount: PropTypes.func.isRequired,
    onUnmount: PropTypes.func.isRequired,
    scale: PropTypes.number.isRequired,
    scalers: PropTypes.array.isRequired,
  })
};

export default Layout;
export { sumArray };
