import React, {Component} from 'react';
import NavBar from '../NavBar';
import './style.css';

class List extends Component {

  constructor(props) {
    super(props);
    this.state={
      category: '',
      name: '',
      _id: this.props.data._id
    }
  }



  handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const addItem = await fetch('http://localhost:9000/addItem', {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(this.state),
        headers: {
          'Content-Type': 'application/json'
        }
      })
    } catch(err) {
      console.log(err);
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.currentTarget.name]: e.currentTarget.value
    })
  }
  render() {
    console.log(this.props.data._id, 'COFFEEE')
    return(
      <div className='background'>
          <h1> {this.props.data.name} </h1>
          <form onSubmit={this.handleSubmit}>
            <input type='text' name='name' placeholder='your item..' onChange={this.handleChange}/>
            <select name='category' onChange={this.handleChange}>
              <option value='produce'>Produce</option>
              <option value='meats'>Meats</option>
              <option value='deli'>Deli</option>
              <option value='dairy'>Dairy</option>
              <option value='bakery'>Bakery</option>
              <option value='frozen'>Frozen</option>
              <option value='dryGoods'>Dry Goods</option>
              <option value='drinks'>Drinks</option>
              <option value='alcohol'>Alcohol</option>
              <option value='general'>General</option>
            </select>
            <input type='Submit' value='+'/>
          </form>
          <div className='categoryWrapper'>
              <div className='category'>
                <h1> Produce </h1>
              </div>
              <div className='category'>
                <h1> Meats </h1>
              </div>
              <div className='category'>
                <h1> Deli </h1>
              </div>
              <div className='category'>
                <h1> Dairy </h1>
              </div>
              <div className='category'>
                <h1> Bakery </h1>
              </div>
              <div className='category'>
                <h1> Frozen </h1>
              </div>
              <div className='category'>
                <h1> Dry Goods </h1>
              </div>
              <div className='category'>
                <h1> Drinks </h1>
              </div>
              <div className='category'>
                <h1> Alcohol </h1>
              </div>
              <div className='category'>
                <h1> General </h1>
              </div>
          </div>
      </div>
    )
  }
}

export default List;
