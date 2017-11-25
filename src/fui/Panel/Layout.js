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
    this.state = { panels: [] };

    this.handlePanelMount = panel => {
      this.setState(prevState => ({
        panels: prevState.panels.concat([panel])
      }));
    };

    this.handlePanelUnmount = panel => {
      this.setState(prevState => {
        const panels = prevState.panels.slice();
        const index = panels.indexOf(panel);
        panels.splice(index, 1);
        return { panels };
      });
    };
  }

  render() {
    const { children, max, render, scale } = this.props;
    const { panels } = this.state;
    const displayed = panels.slice(-max);
    const offscreen = panels[panels.length - max - 1];
    const scalers = [...Array(displayed.length)].map((x, i) =>
      Math.pow(scale, i)
    );
    const baseWidth = 100 / (sumArray(scalers) || 1);
    const passedProps = {
      baseWidth,
      displayed,
      max,
      offscreen,
      onMount: this.handlePanelMount,
      onUnmount: this.handlePanelUnmount,
      scale,
      scalers,
    };
    return (
      <NoOverflow>
        {render ? render(passedProps) : children(passedProps)}
      </NoOverflow>
    );
  }
}

Layout.defaultProps = {
  children() {},
  max: 3,
  render: null,
  scale: 1.5
};

Layout.propTypes = {
  children: PropTypes.func,
  render: PropTypes.func,
};

export default Layout;
export { sumArray };
