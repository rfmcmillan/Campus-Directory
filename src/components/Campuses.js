import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

const Campuses = (props) => {
  console.log('props:', props);
  const { campuses } = props;
  console.log(campuses);
  return (
    <div>
      <h3>Campuses</h3>
      <ul>
        {campuses.map((campus) => {
          return (
            <li>
              {campus.name}
              <br />
              <img src={campus.imageUrl} width="150" />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(Campuses);
