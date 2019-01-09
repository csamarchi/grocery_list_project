import React, {Component} from 'react';
import NavBar from '../NavBar';
import DisplayLists from '../DisplayLists';

class LandingPage extends Component {
  constructor() {
    super();
    this.state = {
      lists: [],
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
      this.setState({lists: list.data})
    }).catch((err) => {
      console.log(err);
    })
  }

  render() {



    return(
      <div>
        <NavBar />
        <DisplayLists lists={this.state.lists}/>
      </div>
    )
  }
}

export default LandingPage;
