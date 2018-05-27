import React, { Component } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import './App.css';
import HomePage from './components/HomePage'


class App extends Component {
  render() {
    return (
      <div className="App">
      <Switch>
          <Route path="/" exact component={ HomePage } />
      </Switch>
      
      </div>
    );
  }
}

export default App;
