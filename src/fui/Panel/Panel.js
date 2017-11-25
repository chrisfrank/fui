import React, { Component } from "react";
import PropTypes from "prop-types";
import { default as styled, keyframes } from "styled-components";
import { sumArray } from './Layout';

const entrance = keyframes`
  0% {
    transform: translate3d(50%, 0, 0);
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
  transition-property: ${props => props.max > 1 ? 'filter, transform, left, width' : 'none'};
  transition-duration: 0.5s;
  width: ${props => props.width}%;
  left: ${props => props.offset}%;
  filter: brightness(${props => props.brightness});
  animation: ${props => props.animate ? `${entrance} 0.5s` : 'none'};
`;

class Panel extends Component {
  constructor(props, context) {
    super(props);
    this.props.onMount(this);
    this.state = { canAnimate: props.max > 1 && props.displayed.length > 0 };

    this.handleAnimationEnd = () => {
      this.setState({ canAnimate: false });
    };
  }

  componentWillUnmount() {
    this.props.onUnmount(this);
  }

  render() {
    const { baseWidth, displayed, max, offscreen, scale, scalers } = this.props;
    if (offscreen === this) return this.renderElement({
      animate: false,
      brightness: 1 - displayed.length * 0.03,
      max,
      offset: -baseWidth / 2,
      width: baseWidth,
    });

    const index = displayed.indexOf(this);
    if (index === -1) return null;

    const width = baseWidth * Math.pow(scale, index);
    const offset = index === 0 ? 0 : baseWidth * sumArray(scalers.slice(0, index));
    const brightness = 1 - (scalers.length - index - 1) * 0.03;

    return this.renderElement({
      animate: this.state.canAnimate,
      brightness,
      index,
      max,
      offset,
      width
    });
  }

  renderElement({ animate, brightness, index, max, offset, width }) {
    const { children, render } = this.props;
    return (
      <Element
        onAnimationEnd={this.handleAnimationEnd}
        animate={animate}
        brightness={brightness}
        className="panel"
        max={max}
        offset={offset}
        width={width}
      >
        <Scroll>
          {render ? render(width / 100 * window.innerWidth) : children}
        </Scroll>
      </Element>
    );
  }
}

Panel.propTypes = {
  baseWidth: PropTypes.number.isRequired,
  displayed: PropTypes.array.isRequired,
  max: PropTypes.number.isRequired,
  offscreen: PropTypes.any,
  onMount: PropTypes.func.isRequired,
  onUnmount: PropTypes.func.isRequired,
  scale: PropTypes.number.isRequired,
  scalers: PropTypes.array.isRequired,
};

export default Panel;
