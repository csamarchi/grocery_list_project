import React, {Component} from 'react';
import NavBar from '../NavBar';
import './style.css';
import { Route, Link, Switch } from 'react-router-dom';


class DisplayLists extends Component {
  constructor() {
    super();

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
