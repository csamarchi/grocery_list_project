import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import NavBar from './NavBar';
import { Route, Link, Switch } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import LandingPage from './LandingPage';
import CreateList from './CreateList';
import ShowPage from './ShowPage';

class App extends Component {
  render() {
    return (
      <div>
          <Switch>
           <Route exact path="/" component={Login} />
           <Route exact path="/register" component={Register} />
           <Route exact path="/landing" component={LandingPage} />
           <Route exact path="/create" component={CreateList} />
           <Route path="/:id" component={ShowPage} />
         </Switch>
      </div>
    );
  }
}

export default App;
