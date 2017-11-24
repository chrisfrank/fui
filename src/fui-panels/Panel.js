import React, { Component } from "react";
import PropTypes from "prop-types";
import { default as styled, keyframes } from "styled-components";
import { sumArray } from './Layout';

const entrance = keyframes`
  0% {
    transform: translate3d(-50%, 0, 0);
    opacity: 0;
  }
  100% {
    transform: translate3d(0,0,0);
    opacity: 1;
  }
`;

const Scroll = styled.div`
  overflow-x: hidden;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  box-sizing: border-box;
  transition: all 0.3s;
  flex: 1;
`;

const Element = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background-color: white;
  transition-property: filter, transform, left, width;
  transition-duration: 0.5s;
  width: ${props => props.width}%;
  left: ${props => props.offset}%;
  filter: brightness(${props => props.brightness});
  animation: ${entrance} 0.5s;
`;

class Panel extends Component {
  constructor(props, context) {
    super(props);
    this.props.onMount(this);
  }

  componentWillUnmount() {
    this.props.onUnmount(this);
  }

  render() {
    const { baseWidth, displayed, offscreen, scale, scalers } = this.props;
    if (offscreen === this) return this.renderOffscreen();

    const index = displayed.indexOf(this);
    if (index === -1) return null;

    const width = baseWidth * Math.pow(scale, index);
    const offset = index == 0 ? 0 : baseWidth * sumArray(scalers.slice(0, index));

    return (
      <Element
        className="panel"
        offset={offset}
        width={width}
        brightness={1 - (scalers.length - index - 1) * 0.03}
      >
        <Scroll>{this.props.children}</Scroll>
      </Element>
    );
  }

  renderOffscreen() {
    return (
      <Element
        className="panel"
        offset={-this.props.baseWidth}
        width={this.props.baseWidth}
        brightness={1 - this.props.displayed.length * 0.03}
      >
        {this.props.children}
      </Element>
    )
  }
}

const ContextPanel = (props, context) => <Panel {...props} {...context.panels} />;

ContextPanel.contextTypes = {
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

export default ContextPanel;
