import React, { Component } from 'react';
import { ScrollDiv, PanelDiv } from './Panel/elements';

const sumArray = (array = []) => array.reduce((a, b) => a + b, 0);

class Child extends Component {
  componentWillMount() {
    this.props.onMount(this);
  }

  componentWillUnmount() {
    this.props.onUnmount(this);
  }

  render() {
    const { children, render, ...props } = this.props;
    const {
      baseWidth,
      displayed,
      max,
      offscreen,
      ratio,
      scale,
      transition
    } = this.props;
    const index = displayed.indexOf(this);
    const width = baseWidth * Math.pow(ratio, index);
    const offset =
      index === 0 ? 0 : baseWidth * sumArray(scale.slice(0, index));

    const style = {
      left: `${offset}%`,
      width: `${width}%`
    };

    const passedProps = {
      index,
      isLast: index === displayed.length - 1,
      width
    };

    return (
      <div>
        {index >= 0 && (
          <PanelDiv transition={transition} style={style}>
            <ScrollDiv>{render({ ...props, passedProps })}</ScrollDiv>
          </PanelDiv>
        )}
        {children({ ...props })}
      </div>
    );
  }
}

export default Child;
