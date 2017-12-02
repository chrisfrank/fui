import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Parent from './Parent';
import Child from './Child';

const Panel = ({ onMount, ...props }) =>
  onMount ? <Child {...props} onMount={onMount} /> : <Parent {...props} />;

Panel.defaultProps = {
  parent: null,
  max: 3,
  ratio: 1.5,
  transition: 0.4
};

export default Panel;
