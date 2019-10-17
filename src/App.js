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
      username: ''
    }
  }

  getList = async () => {
    const list = await fetch('http://localhost:9000/findLists', {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const listParsedJSON = await list.json();
      return listParsedJSON
  }

  componentDidMount() {
    this.getList().then((list) => {
      this.setState({
        username: list.data.username
      })
    })
  }

  render() {
    return (
      <div>
        <NavBar navUsername={this.state.username} />
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
