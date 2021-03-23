import React from 'react';
import { connect, Provider } from 'react-redux';
import Campuses from './Campuses';
import Students from './Students';
import Nav from './Nav';
import Home from './Home';
import { loadCampuses, loadStudents } from '../store';
import { Switch, HashRouter, Route } from 'react-router-dom';
import axios from 'axios';
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
          <Route component={Campuses} path="/campuses" />
          <Route component={Students} path="/students" />
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
