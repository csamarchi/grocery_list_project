import React, {Component} from 'react';
import './style.css';
import List from '../List';

class CreateList extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      list: false,
      form: true,
    }
  }

  handleChange = (e) => {
    this.setState({[e.currentTarget.name]: e.currentTarget.value});
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(this.state, 'worked');

    try {
      const addedList = await fetch('http://localhost:9000/create', {
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
    // console.log(this.state, 'create list ');
    let backgroundHeight = window.innerHeight;

    return(
      <div className='background' style={{height: backgroundHeight}}>
        {this.state.list ? <List data={this.state.createdPostId} name={this.state.name} /> : null}
          <div className='wrapper'>
            <div className='createForm'>
              <form onSubmit={this.handleSubmit}>
                  <h1 className='nameListText'>Name your list: </h1>
                  <input type='text' name='name' placeholder='type something..' onChange={this.handleChange}/>
                <br/>
                  <input className='createButton'type='Submit' value='Create' />
              </form>
            </div>
          </div>
      </div>
    )
  }
}

export default CreateList;
