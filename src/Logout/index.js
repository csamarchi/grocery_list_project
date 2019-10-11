import React, {Component} from 'react';


class Logout extends Component {
    
    state = {};
      
    logoutNow = async () => {
    
        let logoutSession = await fetch('http://localhost:9000/auth/logout', {
            credentials: 'include', 
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
        }
        });

        let logoutSessionJson = await logoutSession.json();

        await this.props.history.push('/');
    }
    render() {
        this.logoutNow();
        console.log(this.props, 'LOGOUT props')
        return(null)
    }
}

export default Logout;