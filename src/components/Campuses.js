import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Campuses = (props) => {
  const { campuses } = props;

  return (
    <div>
      <h3>Campuses</h3>
      <ul>
        {campuses.map((campus, index) => {
          return (
            <li key={index}>
              <Link to={`/campuses/${campus.id}`}>{campus.name}</Link>
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
