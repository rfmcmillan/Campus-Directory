import React from 'react';
import { connect, Provider } from 'react-redux';
import Alert from './Alert';
import Campuses from './Campuses';
import Campus from './Campus';
import CreateCampus from './CreateCampus';
import UpdateCampus from './UpdateCampus';
import Students from './Students';
import Student from './Student';
import CreateStudent from './CreateStudent';
import UpdateStudent from './UpdateStudent';
import Nav from './Nav';
import { loadCampuses, loadStudents } from '../store';
import { HashRouter, Route } from 'react-router-dom';

//import any sub-components

class App extends React.Component {
  //constructor to initialize state

  //any lifecycle methods
  componentDidMount() {
    this.props.bootstrap();
  }

  //any custom methods
  //render
  render() {
    return (
      <HashRouter>
        <div>
          <Route component={Nav} />
          <Route component={CreateCampus} path="/campuses" exact />
          <Route component={Campuses} path="/campuses" exact />
          <Route component={UpdateCampus} path="/campuses/:id" exact />
          <Route component={Campus} path="/campuses/:id" exact />
          <Route component={CreateStudent} path="/students" exact />
          <Route component={Students} path="/students" exact />
          <Route component={UpdateStudent} path="/students/:id" exact />
          <Route component={Student} path="/students/:id" exact />
        </div>
      </HashRouter>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = (dispatch) => {
  return {
    bootstrap: async () => {
      dispatch(loadCampuses());
      dispatch(loadStudents());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
