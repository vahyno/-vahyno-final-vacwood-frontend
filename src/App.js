import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';

import HomePage from './components/HomePage'
import ClassRooms from './components/ClassRooms';
import NewClassRoom from './components/NewClassRoom';
import SingleClassRoom from './components/SingleClassRoom';
import UpdateComment from './components/UpdateComment';
import UpdateClassroom from './components/UpdateClassroom';


class App extends Component {
  render() {
    return (
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
    );
  }
}

export default App;
