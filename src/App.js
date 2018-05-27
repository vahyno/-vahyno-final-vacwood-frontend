import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import HomePage from './components/HomePage'
import ClassRooms from './components/ClassRooms';
import NewClassRoom from './components/NewClassRoom';


class App extends Component {
  render() {
    return (
      <div className="App">
      <Switch>
          <Route exact path='/' component={ HomePage } />
          <Route exact path='/classrooms/new' component={ NewClassRoom } />
          <Route exact path='/classrooms' component={ ClassRooms } />
      </Switch>
      
      </div>
    );
  }
}

export default App;
