import React, {Component} from 'react';
import NavBar from '../NavBar';
import './style.css';
import {Form, Input} from 'reactstrap';

class Login extends Component {
  constructor() {
    super();
  }

  render() {
    return(
      <div className='background'>
        <NavBar />
          <div className='wrapper'>
            <div className='loginForm'>
              <h1> Sign in </h1>
              <Form onSubmit={this.handleSubmit}>
                <label className="username">
                  Username:
                  <input type='text' name='username' placeholder='username' onChange={this.handleChange}/>
                </label> <br/>
                <label className="password">
                  Password:
                  <input type='password' name='password' placeholder='password' onChange={this.handleChange}/>
                </label>
                  <input className="registerButton" type='Submit' value='Login'/>
              </Form>
              <h2> or </h2>
              <h2 className='registerText'> register </h2>
            </div>
          </div>
      </div>
    )
  }
}

export default Login;
