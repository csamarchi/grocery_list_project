import React, { Component } from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Login from './Login';
import Logout from './Logout';
import Register from './Register';
import LandingPage from './LandingPage';
import CreateList from './CreateList';
import ShowPage from './ShowPage';
import NavBar from './NavBar';

class App extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
    }
  }
  //http://10.128.0.2:/8080

  logoutUsernameChange = () => {
    this.setState({
      username: ''
    })
  }

  loginUsernameChange = (username) => {
    this.setState({
      username: username
    })
  }

  render() {
    // console.log(this.state);
    return (
      <div>
        <NavBar navUsername={this.state.username} logoutUsernameChange={this.logoutUsernameChange} />
          <Switch>
             <Route
                exact
                path='/login'
                render={(props) => <Login loginUsernameChange={this.loginUsernameChange} {...props} />}
              />
             <Route
                exact
                path='/logout'
                render={(props) => <Logout {...props} />}
              />
             <Route
                exact
                path='/register'
                render={(props) => <Register loginUsernameChange={this.loginUsernameChange} {...props} />}
              />
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
