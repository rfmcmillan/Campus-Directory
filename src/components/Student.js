import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Student = ({ student, studentCampus }) => {
  if (!student.id) {
    return '...loading user';
  }
  return (
    <div>
      <h3>
        {student.firstName} {student.lastName}
      </h3>
      <img src={student.imageUrl} />
      <ul>
        <li>Email: {student.email}</li>
        <li>GPA: {student.gpa}</li>
        <li>
          Campus:{' '}
          <Link to={`/campuses/${studentCampus.id}`}>{studentCampus.name}</Link>
        </li>
      </ul>
    </div>
  );
};

const mapStateToProps = (state, otherProps) => {
  const { students, campuses } = state;
  let student;
  student = students.find((student) => {
    return student.id === (otherProps.match.params.id * 1 || {});
  });

  const studentCampus = campuses.find((campus) => {
    return student.campusId === campus.id;
  });

  return { student, studentCampus };
};

export default connect(mapStateToProps)(Student);
