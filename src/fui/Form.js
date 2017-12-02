import React, { Component } from 'react';
import { set } from 'lodash';
import PropTypes from 'prop-types';

const mapPropsToState = props => (prevState = {}) => ({
  data: { ...prevState.data, ...props.data }
});

const update = ({ key, value }) => prevState => {
  const data = { ...prevState.data };
  set(data, key, value);
  return { data };
};

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = mapPropsToState(props)();

    this.handleChange = event => {
      const { name, value } = event.currentTarget;
      this.setState(update({ key: name, value }));
    };

    this.handleSubmit = event => {
      event.preventDefault();
      this.props.onSubmit({ data: this.state.data });
    };
  }

  componentWillReceiveProps(props) {
    this.setState(mapPropsToState(props));
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        {this.props.children({
          data: this.state.data,
          onChange: this.handleChange
        })}
      </form>
    );
  }
}

Form.propTypes = {
  children: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired
};

Form.defaultProps = {
  data: null
};

export default Form;
