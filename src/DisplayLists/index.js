import React, {Component} from 'react';
import './style.css';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';


class DisplayLists extends Component {
  constructor() {
    super();
    this.state = {
      a: 'a'
    }
  }

  handleClick = async (e, itemID ) => {
    const deleteList = await fetch('http://35.193.222.119:9000/' + itemID, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const responseList = await deleteList.json();
    this.props.history.push('/create');
  }


  render() {
    //console.log(this.props.list);

    const showList = this.props.lists.map((item, i) => {
      //console.log(this.props.lists);
      return (
        <div key={item._id} className='listDiv' style={{ backgroundColor: `${this.props.lists[i].color}` }}>
          <h4> {item.name} </h4>
          <Link to ={'/' + item._id}>
          <button className='deleteListButton'>View</button>
          </Link>
          <button
            className='deleteListButton'
            itemID={item._id}
            onClick={e => this.handleClick(e, item._id)}>
              Delete List
          </button>
        </div>
      )
    })

    const showCollabList = this.props.collabs.map((item, i) => {
      //console.log(this.props.lists);
      return (
        <div key={item._id} className='listDiv' style={{ backgroundColor: `pink` }}>
          <h4> {item.name} </h4>
          <Link to ={'/' + item._id}>
          <button className='deleteListButton'>View</button>
          </Link>
          <button
            className='deleteListButton'
            itemID={item._id}
            onClick={e => this.handleClick(e, item._id)}
            disabled
            >
              Delete List
          </button>
        </div>
      )
    })


    return(
      <div>
        <div className='gridList'>
          {showList}
          {showCollabList}
        </div>
      </div>
    )
  }
}

export default withRouter(DisplayLists);
