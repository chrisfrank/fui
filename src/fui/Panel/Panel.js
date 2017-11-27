import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { entrance, PanelDiv, ScrollDiv } from './elements';
import { sumArray } from './Tree';

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
    // render element offscreen
    if (offscreen === this && max > 1)
      return this.renderElement({
        animate: false,
        brightness: 1 - displayed.length * 0.03,
        offset: -baseWidth / 2,
        width: baseWidth
      });

    const index = displayed.indexOf(this);
    // for performance reasons, render nothing if this panel isn't
    // in the displayed stack
    if (index === -1) return null;

    const width = baseWidth * Math.pow(ratio, index);
    const offset =
      index === 0 ? 0 : baseWidth * sumArray(scale.slice(0, index));
    const brightness = 1 - (scale.length - index - 1) * 0.03;

    return this.renderElement({
      animate: this.state.canAnimate,
      brightness,
      offset,
      width
    });
  }

  renderElement({ animate, brightness, offset, width }) {
    const { bg, children, color, displayed, index, render } = this.props;
    const style = {
      backgroundColor: bg,
      color,
      filter: `brightness(${brightness})`,
      left: `${offset}%`,
      width: `${width}%`
    };
    const passedProps = {
      isLast: index === displayed.length - 1,
      width: {
        percent: width,
        px: width / 100 * window.innerWidth
      }
    };
    return (
      <PanelDiv
        animate={animate}
        className="panel"
        data-index={index}
        data-last={index === this.props.displayed.length - 1 ? true : null}
        onAnimationEnd={this.handleAnimationEnd}
        style={style}
        transition={this.props.transition}
      >
        <ScrollDiv>{render ? render(passedProps) : children}</ScrollDiv>
      </PanelDiv>
    );
  }
}

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
