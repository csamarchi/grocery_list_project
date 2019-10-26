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
import CreateModal from '../CreateModal';


export default class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownOpen: false,
      userLoggedIn: ''
      // navUsername: props.username
    };
    this.toggle = this.toggle.bind(this);
  }


  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  render() {
    // console.log(this.props, 'nav bar')
    return (
      <div>
        <Navbar style={{height: '40px'}}  color="dark" light expand="md">
            <Link to="/" style={{ color: 'white', textDecoration: 'none', fontSize: '1.5em' }}>
            grocery list
            </Link>
          <NavbarToggler onClick={this.toggle} />
            <Nav className="ml-auto" navbar>
              <NavItem style={{ marginTop: '8px'}}>
                  <Link
                    to= "/"
                    style={{
                      fontSize: '1em',
                      color: 'white',
                      textDecoration: 'none',
                      paddingLeft: '16px',
                      paddRight: '4px'
                    }}>
                    Your Lists
                  </Link>
              </NavItem>
            <NavItem>
              <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
              <DropdownToggle
                style={{
                  fontSize: '1em',
                  color: 'white',
                  backgroundColor: 'transparent',
                  borderColor: 'transparent',
                }}
                caret
              >
                {this.props.navUsername}
              </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem header><Link onClick={this.props.logoutUsernameChange} to='/logout'>Logout</Link></DropdownItem>
                </DropdownMenu>
                </Dropdown>
              </NavItem>
            </Nav>
        </Navbar>
      </div>
    );
  }
}
