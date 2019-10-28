import React, {Component} from 'react';
import './style.css';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import CreateModal from '../CreateModal';


class DisplayLists extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
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
    await this.props.updateState(responseList.data);
  }

  handleChange = (e) => {
    this.setState({[e.currentTarget.name]: e.currentTarget.value});
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(this.state, 'worked');

    try {
      const addedList = await fetch('http://35.193.222.119:9000/create', {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(this.state),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      // console.log(addedList)

      const parsedResponse = await addedList.json();
      // console.log(parsedResponse, 'this is  our parsed data at login');
      let link = await '/'.concat(parsedResponse.data._id);

      await console.log(parsedResponse, 'PARSED RESPONSE')
      await this.props.history.push(link)
    } catch (err) {
      console.log(err);
      console.log('error');
    }
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
          {/* <Link to='/create' style={{textDecoration: 'none'}}> */}
          <CreateModal
            handleChange={this.handleChange}
            handleSubmit ={this.handleSubmit}
          />
          {/* <div className='addDiv'>
            <h1 style={{fontSize: '2em', marginTop: '6px'}}><b> Add a List</b></h1>
            <h1 style={{fontSize: '3em'}}> + </h1>
          </div> */}
          {/* </Link> */}
        </div>
      </div>
    )
  }
}

export default withRouter(DisplayLists);
