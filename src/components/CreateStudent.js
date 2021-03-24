import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStudent } from '../store';

class CreateStudent extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
    };
    this.onChange = this.onChange.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  onChange(ev) {
    console.log(ev);
    const change = {};
    change[ev.target.name] = ev.target.value;
    this.setState(change);
  }

  async onSave(ev) {
    ev.preventDefault();
    try {
      console.log('inside try');
      console.log(this.state.name);
      const { name } = this.state;
      await this.props.create(name);
      console.log('create called');
    } catch (error) {
      console.log(`error: onSave func isn't going through`);
      // this.setState({ error: error.response.data.error });
    }
  }

  render() {
    const { name } = this.state;
    const { onChange, onSave } = this;
    return (
      <div>
        <h5>Add Another Student:</h5>
        <form onSubmit={onSave}>
          {/* <pre>{!!error && JSON.stringify(error, null)}</pre> */}
          <label>Name:</label>
          <input name="name" value={name} onChange={onChange} />
          <br />

          <button>Save</button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, otherProps) => {
  console.log('mapping dispatch to props', otherProps);
  return {
    create: (name) => dispatch(createStudent(name, history)),
  };
};

export default connect(null, mapDispatchToProps)(CreateStudent);
