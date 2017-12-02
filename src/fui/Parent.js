import React, { Component } from 'react';
import Child from './Child';

const sumArray = (array = []) => array.reduce((a, b) => a + b, 0);

class ParentPanel extends Component {
  constructor(props) {
    super(props);
    this.state = { panels: [] };

    this.handleMount = panel => {
      this.setState(prevState => ({
        panels: prevState.panels.concat([panel])
      }));
    };

    this.handleUnmount = panel => {
      this.setState(prevState => {
        const panels = prevState.panels.slice();
        const index = panels.indexOf(panel);
        panels.splice(index, 1);
        return { panels };
      });
    };
  }

  render() {
    const { max, ratio, transition } = this.props;
    const { panels } = this.state;
    const displayed = panels.slice(-max);
    const offscreen = panels[panels.length - max - 1];
    const scale = [...Array(displayed.length)].map((x, i) =>
      Math.pow(ratio, i)
    );
    const baseWidth = 100 / (sumArray(scale) || 1);
    const passedProps = {
      baseWidth,
      displayed,
      max,
      offscreen,
      onMount: this.handleMount,
      onUnmount: this.handleUnmount,
      ratio,
      scale,
      transition
    };
    return <Child {...this.props} {...passedProps} />;
  }
}

export default ParentPanel;
