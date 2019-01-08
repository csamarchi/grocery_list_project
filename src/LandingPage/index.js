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
    const list = await fetch('http://localhost:9000/findLists');
    console.log(list, 'MKMK');
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
        {this.state.lists ? <DisplayLists lists={this.state.lists}/> : null }
      </div>
    )
  }
}

export default LandingPage;
