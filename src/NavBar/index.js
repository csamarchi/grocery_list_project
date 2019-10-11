import React from 'react';
import {Link} from "react-router-dom";
import {
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  NavItem,
  NavLink } from 'reactstrap';

export default class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownOpen: false,
      usernames: props.username
    };

    this.toggle = this.toggle.bind(this);
  }

  logout = async () => {
    let logoutSession = await fetch('http://localhost:9000/auth/logout', {
      credentials: 'include', 
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    let logoutSessionJson = await logoutSession.json();

    await console.log(logoutSessionJson);

    // await this.props.history.push('/');
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  render() {
    // console.log(this.props, 'props')
    return (
      <div>
        <Navbar style={{height: '40px'}}  color="dark" light expand="md">
          <NavbarBrand style={{ color: 'white' }} href="/">grocery list</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink
                  href="/create"
                  style={{
                    fontSize: '1.5em',
                    color: 'white'
                  }}
                  >
                  +
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  href="/"
                  style={{
                    fontSize: '1em',
                    marginTop: '8px',
                    color: 'white',
                  }}>
                  Your Lists
                </NavLink>
              </NavItem>
              <NavItem>
              <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
              <DropdownToggle
                style={{
                  fontSize: '1em',
                  marginTop: '8px',
                  color: 'white',
                }}
                caret
              >
                {this.props.username}
              </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem header><Link to='/logout'>Logout</Link></DropdownItem>
                </DropdownMenu>
                </Dropdown>
              </NavItem>
            </Nav>
        </Navbar>
      </div>
    );
  }
}
