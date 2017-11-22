import React, { Component } from "react";
import PropTypes from "prop-types";
import Panel from './Panel';

class Panels extends Component {
  constructor(props) {
    super(props);
    this.state = { panels: [] };
    this.update = (fn, callback) => this.setState(fn, callback);
  }

  render() {
    const { children } = this.props;
    const props = {
      ...this.state,
      update: this.update,
    };
    const panels = this.state.panels.map((panel, index) => (
      <Panel
        index={index}
        key={`panel_${index}`}
        children={panel}
      />
    ));
    return panels;
  }
}

Panels.propTypes = {
  children: PropTypes.func.isRequired,
};

export default Panels;
