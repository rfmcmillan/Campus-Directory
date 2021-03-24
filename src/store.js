import {
  createStore,
  combineReducers,
  applyMiddleware,
  bindActionCreators,
} from 'redux';
import axios from 'axios';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

const LOAD_CAMPUSES = 'LOAD_CAMPUSES';
const CREATE_CAMPUS = 'CREATE_CAMPUS';

const LOAD_STUDENTS = 'LOAD_STUDENTS';
const CREATE_STUDENT = 'CREATE_STUDENT';

//Action creators & their thunks
const _loadCampuses = (campuses) => {
  return {
    type: LOAD_CAMPUSES,
    campuses,
  };
};

const loadCampuses = () => {
  return async (dispatch) => {
    const campuses = (await axios.get('/api/campuses')).data;
    dispatch(_loadCampuses(campuses));
  };
};

const _createCampus = (campus) => {
  return {
    type: CREATE_CAMPUS,
    campus,
  };
};

const createCampus = (name, streetAddress, city, state, zip, history) => {
  return async (dispatch) => {
    const campus = (
      await axios.post('/api/campuses', {
        name,
        streetAddress,
        city,
        state,
        zip,
      })
    ).data;

    dispatch(_createCampus(campus));
    history.push(`/campuses/${campus.id}`);
  };
};

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

const createStudent = (name) => {
  return async (dispatch) => {
    const student = (await axios.post('/api/students', { name })).data;
    dispatch(_createStudent(student));
    history.push(`students/${student.id}`);
  };
};

//Reducers
const campusesReducer = (state = [], action) => {
  if (action.type === LOAD_CAMPUSES) {
    state = action.campuses;
  }
  if (action.type === CREATE_CAMPUS) {
    state = [...state, action.campus];
  }
  return state;
};

const studentsReducer = (state = [], action) => {
  if (action.type === LOAD_STUDENTS) {
    state = action.students;
  }
  if (action.type === CREATE_STUDENT) {
    state = [...state, action.student];
  }
  return state;
};

const reducer = combineReducers({
  campuses: campusesReducer,
  students: studentsReducer,
});

const store = createStore(reducer, applyMiddleware(thunk, logger));

export default store;
export { loadCampuses, loadStudents, createCampus, createStudent };
