import React, { Component } from "react";
import PropTypes from "prop-types";
import { default as styled, keyframes } from "styled-components";
import { sumArray } from './Tree';

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
  transition-property: filter, transform, left, width;
  transition-duration: 0.5s;
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
    const { baseWidth, displayed, max, offscreen, ratio, scale } = this.props;
    if (offscreen === this && max > 1) return this.renderElement({
      animate: false,
      brightness: 1 - displayed.length * 0.03,
      offset: -baseWidth / 2,
      width: baseWidth,
    });

    const index = displayed.length === 0 ? 0 : displayed.indexOf(this);
    if (index === -1) return null;

    const width = baseWidth * Math.pow(ratio, index);
    const offset = index === 0 ? 0 : baseWidth * sumArray(scale.slice(0, index));
    const brightness = 1 - (scale.length - index - 1) * 0.03;

    return this.renderElement({
      animate: this.state.canAnimate,
      brightness,
      offset,
      width
    });
  }

  renderElement({ animate, brightness, offset, width }) {
    const { children, render } = this.props;
    const style = {
      width: `${width}%`,
      left: `${offset}%`,
      filter: `brightness(${brightness})`,
    };
    return (
      <Element
        onAnimationEnd={this.handleAnimationEnd}
        animate={animate}
        className="panel"
        style={style}
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
  ratio: PropTypes.number.isRequired,
  scale: PropTypes.array.isRequired,
};

export default Panel;
