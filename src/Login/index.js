import React, {Component} from 'react';
import './style.css';
import { Form } from 'reactstrap';
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

        if(parsedResponse.data.result === 'login successful') {
          this.props.loginUsernameChange(parsedResponse.data.username)
          this.props.history.push('/');

        } else if(parsedResponse.data.result === 'login unsuccessful'){
          alert('Incorrect')
      }
    }

      handleChange = (e) => {
        this.setState({[e.target.name]:e.target.value});
      }



  render() {
    let backgroundHeight = window.innerHeight;

    return(
      <div style={{ backgroundColor: '#ebecf0', height: backgroundHeight }}>
          <div className='wrapper'>
            <div className='loginForm'>
              <h1 className='groceryLogo'> groceryList </h1>
              <Form onSubmit={this.handleSubmit}>
                  <input type='text' name='username' placeholder='username' onChange={this.handleChange}/>
                 <br/>
                  <input type='password' name='password' placeholder='password' onChange={this.handleChange}/>
                  <br/><input className='loginButton'type='Submit' />
              </Form>
              <h1 className='signInText'> ────── or ────── </h1>
              <Link to ='/register'> <h2 className='registerText'> register </h2> </Link>
            </div>
          </div>
      </div>
    )
  }
}

export default Login;
