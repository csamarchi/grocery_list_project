import React, { Component } from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Login from './Login';
import Logout from './Logout';
import Register from './Register';
import LandingPage from './LandingPage';
import CreateList from './CreateList';
import ShowPage from './ShowPage';

class App extends Component {
  render() {
    return (
      <div>
          <Switch>
             <Route exact path="/login" component={Login} />
             <Route
                exact
                path='/logout'
                render={(props) => <Logout {...props} />}
              />
             <Route exact path="/register" component={Register} />
             {/* <Route exact path="/" component={LandingPage} /> */}
             <Route
                exact
                path='/'
                render={(props) => <LandingPage {...props} />}
              />
             <Route exact path="/create" component={CreateList} />
             <Route exact path="/:id" component={ShowPage} />
         </Switch>
      </div>
    );
  }
}

export default App;
