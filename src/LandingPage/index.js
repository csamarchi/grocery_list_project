import React, {Component} from 'react';
import DisplayLists from '../DisplayLists';


class LandingPage extends Component {
  constructor() {
    super();
    this.state = {
      lists: [],
      collabLists: [],
      username: ''
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
      //console.log(list)
      // If the response says log in required
      if (list.data === 'Log in required') {
        // push them to the login page
        this.props.history.push('/login');
        // or else
      } else {
        // render the landing page for the user
        this.setState({
          lists: list.data.foundLists,
          collabLists: list.data.foundCollabs,
          username: list.data.username
        })
      }
    }).catch((err) => {
      console.log(err);
    })
  }

  updateState = (data) => {
    let lists = this.state.lists
    lists.map((item, i) => {
    if (item._id === data._id) {
      lists.splice(i, 1)
    }
  })
    this.setState({
      lists: lists
    })
  }

//Delete Function
  deleteList = async (id) => {
      //console.log(id, ' this is id');
      const deleteListResponse = await fetch('http://localhost:9000/api/v1/list/' + id, {
          method: 'DELETE'
        });
      const deleteListParsed = await deleteListResponse.text();
      this.setState({
        lists: this.state.lists.filter((oneList) => oneList._id !== id )
      })
    }


  render() {
    // console.log(this.state, 'state')
    let backgroundHeight = window.innerHeight;

    return(
      <div style={{ backgroundColor: '#ebecf0', height: backgroundHeight }}>
        <DisplayLists
          navUsername={this.state.username}
          lists={this.state.lists}
          collabs={this.state.collabLists}
          updateState={this.updateState}
          getList={this.getList}
        />
      </div>
    )
  }
}

export default LandingPage;
