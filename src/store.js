import { createStore, combineReducers, applyMiddleware } from 'redux';
import axios from 'axios';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

const LOAD_STUDENTS = 'LOAD_STUDENTS';
const CREATE_STUDENT = 'CREATE_STUDENT';
const DESTROY_STUDENT = 'DESTROY_STUDENT';
const UPDATE_STUDENT = 'UPDATE_STUDENT';
const UNREGISTER_STUDENT = 'UNREGISTER_STUDENT';

//Action creators & their thunks

const _loadStudents = (students) => {
  return {
    type: LOAD_STUDENTS,
    students,
  };
};

const loadStudents = () => {
  return async (dispatch) => {
    const students = (await axios.get('/api/students')).data;
    dispatch(_loadStudents(students));
  };
};

const _createStudent = (student) => {
  return {
    type: CREATE_STUDENT,
    student,
  };
};

const createStudent = (firstName, lastName, email, history) => {
  return async (dispatch) => {
    const student = (
      await axios.post('/api/students', { firstName, lastName, email })
    ).data;
    dispatch(_createStudent(student));
  };
};

const _destroyStudent = (student) => {
  return {
    type: DESTROY_STUDENT,
    student,
  };
};

const destroyStudent = (student, history) => {
  return async (dispatch) => {
    await axios.delete(`api/students/${student.id}`);
    dispatch(_destroyStudent(student));
  };
};

const _updateStudent = (student) => {
  return {
    type: UPDATE_STUDENT,
    student,
  };
};

const updateStudent = (id, firstName, lastName, email, history) => {
  return async (dispatch) => {
    const student = (
      await axios.put(`/api/students/${id}`, {
        firstName,
        lastName,
        email,
      })
    ).data;
    dispatch(_updateStudent(student));
  };
};

//Reducers

const studentsReducer = (state = [], action) => {
  if (action.type === LOAD_STUDENTS) {
    state = action.students;
  }
  if (action.type === CREATE_STUDENT) {
    state = [...state, action.student];
  }
  if (action.type === DESTROY_STUDENT) {
    state = state.filter((student) => student.id !== action.student.id);
  }
  if (action.type === UPDATE_STUDENT) {
    const otherStudents = state.filter(
      (student) => student.id !== action.student.id
    );
    state = [...otherStudents, action.student];
  }
  if (action.type === UNREGISTER_STUDENT) {
    const otherStudents = state.filter(
      (student) => student.id !== action.unregisteredStudent.id
    );
    state = [...otherStudents, action.unregisteredStudent];
  }

  return state;
};

const reducer = combineReducers({
  students: studentsReducer,
});

const store = createStore(reducer, applyMiddleware(thunk, logger));

export default store;
export {
  loadStudents,
  createStudent,
  destroyStudent,
  updateStudent,
  UNREGISTER_STUDENT,
};
