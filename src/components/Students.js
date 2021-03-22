import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

const Students = (props) => {
  console.log('props:', props);
  const { students } = props;

  return (
    <div>
      <h3>Students</h3>
      <ul>
        {students.map((student) => {
          return (
            <li>
              {student.firstName} {student.lastName}
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
