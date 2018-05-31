import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';

import HomePage from './components/HomePage'
import ClassRooms from './components/ClassRooms';
import NewClassRoom from './components/NewClassRoom';
import SingleClassRoom from './components/SingleClassRoom';
import UpdateComment from './components/UpdateComment';
import UpdateClassroom from './components/UpdateClassroom';
// import Header from './components/Header';
// import Footer from './components/Footer';


class App extends Component {
  render() {
    // let test = window.location.pathname;
    // let header = window.location.pathname === '/' ? '' : <Header />;
    // let footer = window.location.pathname === '/' ? '' : <Footer />;
    return (
      <div className="App">
        {/* header */}
        {/*<main className="App blue lighten-4">*/}
        <Switch>
            <Route exact path='/' component={ HomePage } />
            <Route exact path='/classrooms' component={ ClassRooms } />
            <Route exact path='/classrooms/new' component={ NewClassRoom } />
            <Route exact path='/classrooms/:classroom_id' component={ SingleClassRoom } />
            <Route exact path='/classrooms/:classroom_id/update' component={ UpdateClassroom } />

            <Route exact path='/classrooms/:classroom_id/comments/:comment_id/update' component={ UpdateComment } />
        </Switch>
        
        {/*</main>*/}
        {/* footer*/}
      </div>
    );
  }
}

export default App;
