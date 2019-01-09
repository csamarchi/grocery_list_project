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
          this.props.history.push('/create');

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
              <h1 className='groceryLogo'> groceryList </h1>
              <Form onSubmit={this.handleSubmit}>
                  <input type='text' name='username' placeholder='username' onChange={this.handleChange}/>
                 <br/>
                  <input type='password' name='password' placeholder='password' onChange={this.handleChange}/>
                  <br/><input className='loginButton'type='Submit' value='Log in'/>
              </Form>
              <h1 className='signInText'> ----------- or ----------- </h1>
              <Link to ='/register'> <h2 className='registerText'> register </h2> </Link>
            </div>
          </div>
      </div>
    )
  }
}

export default Login;
