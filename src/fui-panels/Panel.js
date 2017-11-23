import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { default as styled, keyframes } from 'styled-components';

const colors = ['#faa', '#aff', '#faf'];

const entrance = keyframes`
  0% {
    transform: translate3d(-50%, 0, 0);
    opacity: 0;
  }
  100% {
    transform: translate3d(0,0,0);
    opacity: 1;
  }
`

const Scroll = styled.div`
  overflow-x: hidden;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  box-sizing: border-box;
  transition: all .3s;
  padding: 1em;
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
  transition-duration: .5s;
  width: ${props => props.width}%;
  left: ${props => props.offset}%;
  filter: brightness(${props => props.brightness});
  animation: ${entrance} .5s;
`

const sum = array => array.reduce((a, b) => (a + b), 0);

class Panel extends Component {
  constructor(props, context) {
    super(props, context);
    context.panels.onMount(this);
  }

  componentWillUnmount() {
    const { panels } = this.context;
    panels.onUnmount(this);
  }

  render() {
    const  { panels } = this.context;
    const index = panels.list.indexOf(this);
    if (index === -1) return null;

    const scale = [...Array(panels.list.length)].map((x, i) => (
      Math.pow(panels.scale, i)
    ));

    const baseWidth = 100 / (sum(scale) || 1);
    const width = baseWidth * Math.pow(panels.scale, index);
    const offset = index == 0 ? 0 : (
      baseWidth * sum(scale.slice(0, index))
    );

    return (
      <Element
        className="panel"
        offset={offset}
        width={width}
        brightness={1 - (scale.length - index - 1)*.03}
      >
        <Scroll>{this.props.children}</Scroll>
      </Element>
    );
  }
}

Panel.contextTypes = {
  panels: PropTypes.shape({
    list: PropTypes.array.isRequired,
    onMount: PropTypes.func.isRequired,
    onUnmount: PropTypes.func.isRequired,
    scale: PropTypes.number.isRequired,
  }).isRequired,
};

export default Panel;
