import React from 'react';
import { connect } from 'react-redux';

const Alert = (props) => {
  console.log(props);
  return <p id="alert"></p>;
};

const mapStateToProps = (state, otherProps) => {
  console.log(state);

  return state;
};

export default connect(mapStateToProps)(Alert);
