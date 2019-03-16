import React, {Component} from 'react';
import NavBar from '../NavBar';
import './style.css';
import { Route, Link, Switch } from 'react-router-dom';


class DisplayLists extends Component {
  constructor() {
    super();

  }

handleClick = async (itemID) => {
  // e.preventDefault();
  console.log(itemID);
  const deleteList = await fetch('http://localhost:9000/' + itemID, {
    method: 'DELETE',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const responseList = await deleteList.json();
await  console.log(responseList, '56789');
  await this.setState({
      name: 'awefawfe'
   })
await  this.props.history.push('/landing');
    // this.setState({deleted: '124'})
}

  render() {



    const showList = this.props.lists.map((item, i) => {
      console.log(item.name);
      return (
        <div key={item._id} className='listDiv'>
          <h4> {item.name} </h4>
          <Link to ={'/' + item._id}>
          <button>View</button>
          </Link>
          <button itemID={item._id} onClick={this.handleClick.bind(null, item._id)}>Delete List</button>
        </div>
      )
    })


    return(
      <div>
        <div className='gridList'>
          {showList}
        </div>
      </div>
    )
  }
}

export default DisplayLists;
