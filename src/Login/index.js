import React, {Component} from 'react';
import NavBar from '../NavBar';
import './style.css';
import {Form, Input} from 'reactstrap';
import { Link } from 'react-router-dom';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username:'',
      password:''
}
  }

  handleSubmit = async (e) => {
      e.preventDefault();
      const loginResponse = await fetch('http://localhost:9000/auth/login', {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(this.state),
        headers:{
          'Content-Type': 'application/json'
          }
      });

      const parsedResponse = await loginResponse.json();
      console.log(parsedResponse, 'this is our parsed data at login');

        if(parsedResponse.data === 'login successful') {
          this.props.history.push('/landing');

        } else if(parsedResponse.data === 'login unsuccessful'){
          alert('Password Incorrect')
        } else if(parsedResponse.data === 'login unsuccessful'){
          alert('Username Not Found. Please Register')
        }
      }

      handleChange = (e) => {
        this.setState({[e.target.name]:e.target.value});
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
              <Link to ='/register'> <h2 className='registerText'> register </h2> </Link>
            </div>
          </div>
      </div>
    )
  }
}

export default Login;
