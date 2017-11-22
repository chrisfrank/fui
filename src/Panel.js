import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const panels = {};
const colors = ['blue', 'yellow', 'red'];

const Scroll = styled.div`
  overflow-x: hidden;
  overflow-y: auto;
  flex: 1,
  -webkit-overflow-scrolling: touch;
  box-sizing: border-box;
  transition: all .3s;
`;

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  box-sizing: border-box;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  left: ${props => props.index * 160}px;
  background-color: ${props => colors[props.index]};
`
class Panel extends Component {
  constructor(props) {
    super(props);
    panels[props.id] = this;
  }

  componentWillUnmount() {
    delete panels[this.props.id];
  }

  render() {
    if (!this.props.id) throw "Panel needs a unique id";
    const keys = Object.keys(panels)
    const index = keys.indexOf(this.props.id)
    return (
      <Wrapper index={index}>
        <Scroll>
          {this.props.children}
        </Scroll>
      </Wrapper>
    );
  }
}

Panel.propTypes = {
  id: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
};

export default Panel;
