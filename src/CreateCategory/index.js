import React, {Component} from 'react';
import './style.css';
// import List from '../List';
import Adder from './adder.js';

class CreateList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      id: props.id,
      displayAdder: false,
      // list: this.props.list,
    }
  }

  handleChange = (e) => {
    this.setState({[e.currentTarget.name]: e.currentTarget.value});
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    //console.log(this.state, 'worked');
    try {
      const addedCategory = await fetch('http://localhost:9000/addCategory', {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(this.state),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      let categoryResponse = await addedCategory.json();
      await this.props.updateState(categoryResponse.data)
      this.setState({
        name: '',
      })
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    //console.log(this.state, 'state');

    return(
      <div className='background'>
        <div className='wrapper'>
          <Adder
            onSubmit={this.handleSubmit}
            handleChange={this.handleChange}
            name={this.state.name}
          />
        </div>
      </div>
    )
  }
}

export default CreateList;
