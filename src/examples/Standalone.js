import React, { Component } from "react";
import { Panel, PanelTree } from '../fui/Panel';
import LoremIpsum from './LoremIpsum';

const style = { padding: "1em" };

class StateExample extends Component {
  constructor(props) {
    super(props);
    this.state = { open: false }

    this.handleToggle = event => {
      event.preventDefault();
      this.setState(prevState => ({ open: !prevState.open }));
    };
  }

  render() {
    const { onHide, tree } = this.props;
    const label = this.state.open ? "Hide" : "Show";
    return (
      <div>
        <Panel {...tree}>
          <div style={style}>
            <h1>Recursive Panels</h1>
            <p>via component state</p>
            <p>
              {onHide ? <button onClick={onHide}>Hide this</button> : (
                <a href="/">Back to examples</a>
              )}
            </p>
            <p>
              <button onClick={this.handleToggle}>{label} next</button>
            </p>
            <LoremIpsum />
          </div>
        </Panel>
        {this.state.open && <StateExample tree={tree} onHide={this.handleToggle} />}
      </div>
    );
  }
}

const Standalone = () => (
  <PanelTree
    render={tree => (
      <StateExample tree={tree} />
    )}
  />
);

export default Standalone;
