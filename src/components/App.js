import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import '../App.css';
import { connect } from 'react-redux';

import { handleInitialData } from '../actions/classroom';

import HomePage from './HomePage'
import ClassRooms from './ClassRooms';
import NewClassRoom from './NewClassRoom';
import SingleClassRoom from './SingleClassRoom';
import UpdateComment from './UpdateComment';
import UpdateClassroom from './UpdateClassroom';


class App extends Component {
  
  componentDidMount() {
    this.props.dispatch(handleInitialData());
}
  render() {
    return (
      <Router>
        <div className="App">
          <Switch>
              <Route exact path='/' component={ HomePage } />
              <Route exact path='/classrooms' component={ ClassRooms } />
              <Route exact path='/classrooms/new' component={ NewClassRoom } />
              <Route exact path='/classrooms/:classroom_id' component={ SingleClassRoom } />
              <Route exact path='/classrooms/:classroom_id/update' component={ UpdateClassroom } />
              <Route exact path='/classrooms/:classroom_id/comments/:comment_id/update' component={ UpdateComment } />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default connect()(App);
