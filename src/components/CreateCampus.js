import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createCampus } from '../store';

class CreateCampus extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      streetAddress: '',
      city: '',
      state: '',
      zip: '',
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
      const { name, streetAddress, city, state, zip } = this.state;
      await this.props.create(name, streetAddress, city, state, zip);
      console.log('create called');
    } catch (error) {
      console.log(`error: onSave func isn't going through`);
      this.setState({ error: error.response.data.error });
    }
  }

  render() {
    const { name, streetAddress, city, state, zip, error } = this.state;
    const { onChange, onSave } = this;
    return (
      <div>
        <h5>Add Another Campus:</h5>
        <form onSubmit={onSave}>
          <pre>{!!error && JSON.stringify(error, null)}</pre>
          <label>Name:</label>
          <input name="name" value={name} onChange={onChange} />
          <br />
          <label>Street Address:</label>
          <input
            name="streetAddress"
            value={streetAddress}
            onChange={onChange}
          />
          <br />
          <label>City:</label>
          <input name="city" value={city} onChange={onChange} />
          <br />
          <label>State:</label>
          <input name="state" value={state} onChange={onChange} />
          <br />
          <label>Zip:</label>
          <input name="zip" value={zip} onChange={onChange} />
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
    create: (name, streetAddress, city, state, zip) =>
      dispatch(createCampus(name, streetAddress, city, state, zip, history)),
  };
};

export default connect(null, mapDispatchToProps)(CreateCampus);
