import React, { Component } from 'react';
import Form from '../fui/Form';

const handleSubmit = ({ data }) => {
  console.log(data);
};

const model = {
  name: '',
  age: '',
  meta: {
    graduation_year: '',
    gpa: ''
  }
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { model };
  }

  render() {
    return (
      <Form data={this.state.model} onSubmit={handleSubmit}>
        {({ data, onChange }) => (
          <div>
            <label>Name</label>
            <input onChange={onChange} name="name" value={data.name} />
            <label>Age</label>
            <input onChange={onChange} name="age" value={data.age} />
            <label>graduation year</label>
            <input
              onChange={onChange}
              name="meta.graduation_year"
              value={data.meta.graduation_year}
            />
            <label>gpa</label>
            <input onChange={onChange} name="meta.gpa" value={data.meta.gpa} />
            <input type="submit" value="Submit" />
          </div>
        )}
      </Form>
    );
  }
}

export default App;
