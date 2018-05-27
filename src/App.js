import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import HomePage from './components/HomePage'
import ClassRooms from './components/ClassRooms';


class App extends Component {
  render() {
    return (
      <div className="App">
      <Switch>
          <Route path="/" exact component={ HomePage } />
          <Route exact path='/classrooms' component={ ClassRooms } />
      </Switch>
      
      </div>
    );
  }
}

export default App;
