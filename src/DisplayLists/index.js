import React, {Component} from 'react';
import NavBar from '../NavBar';
import './style.css';
import { Route, Link, Switch } from 'react-router-dom';
import { withRouter } from 'react-router-dom';



class DisplayLists extends Component {
  constructor() {
    super();
    this.state = {
      a: 'a'
    }

  }

handleClick = async (e, itemID ) => {
  // await e.preventDefault();
  await console.log(itemID);
  const deleteList = await fetch('http://localhost:9000/' + itemID, {
    method: 'DELETE',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const responseList = await deleteList.json();
  await  console.log(responseList, '56789');

   this.props.history.push('/create');
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
          <button itemID={item._id} onClick={e => this.handleClick(e, item._id)}>Delete List</button>
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

export default withRouter(DisplayLists);
