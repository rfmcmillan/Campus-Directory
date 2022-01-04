import React from 'react';
import { connect, Provider } from 'react-redux';

import Home from './Home';
import Students from './Students';
import Student from './Student';
import CreateStudent from './CreateStudent';
import UpdateStudent from './UpdateStudent';
import Nav from './Nav';
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
      <Provider store={store}>
        <HashRouter>
          <div>
            <Route component={Nav} />
            <Route component={Home} path="/" exact />
            <Route component={CreateStudent} path="/students" exact />
            <Route component={Students} path="/students" exact />
            <Route component={UpdateStudent} path="/students/:id" exact />
            <Route component={Student} path="/students/:id" exact />
          </div>
        </HashRouter>
      </Provider>
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
