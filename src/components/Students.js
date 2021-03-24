import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Students = (props) => {
  const { students } = props;

  return (
    <div>
      <h3>Students</h3>
      <ul>
        {students.map((student, index) => {
          return (
            <li key={index}>
              <Link to={`/students/${student.id}`}>
                {student.firstName} {student.lastName}
              </Link>
              <button className="delete">X</button>
              <br />
              <img src={student.imageUrl} height="100" />
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

export default connect(mapStateToProps)(Students);
