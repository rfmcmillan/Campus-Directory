import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Campus = ({ campus, campusStudents }) => {
  if (!campus.id) {
    return '...loading user';
  }
  return (
    <div>
      <h3>{campus.name}</h3>
      <img src={campus.imageUrl} width="500" />
      <h5>Address:</h5>
      <p>
        {campus.streetAddress}
        <br />
        {campus.city}, {campus.state} {campus.zip}
      </p>
      <h5>Description:</h5>
      <p>{campus.description}</p>
      <h5>Students</h5>
      <ul>
        {campusStudents.length ? (
          campusStudents.map((student, index) => {
            return (
              <li key={index}>
                <Link to={`/students/${student.id}`}>
                  {student.firstName} {student.lastName}
                </Link>
              </li>
            );
          })
        ) : (
          <li>No students are currently enrolled</li>
        )}
      </ul>
    </div>
  );
};

const mapStateToProps = (state, otherProps) => {
  const { campuses, students } = state;
  const campusStudents = students.filter((student) => {
    return student.campusId === otherProps.match.params.id * 1;
  });
  let campus;
  campus = campuses.find((campus) => {
    return campus.id === (otherProps.match.params.id * 1 || {});
  });

  return { campus, campusStudents };
};

export default connect(mapStateToProps)(Campus);
