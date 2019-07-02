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

//Delete Function
  deleteList = async (id) => {
      console.log(id, ' this is id');
      const deleteListResponse = await fetch('http://localhost:9000/api/v1/list/' + id, {
          method: 'DELETE'
        });
      const deleteListParsed = await deleteListResponse.text();
      console.log(deleteListParsed, 'deleted')
      this.setState({
        lists: this.state.lists.filter((oneList) => oneList._id !== id )
      })
    }


  render() {



    return(
      <div>
        <NavBar />
        <DisplayLists lists={this.state.lists} />
      </div>
    )
  }
}

export default LandingPage;
