import React, {Component} from 'react';
import NavBar from '../NavBar';
import './style.css';

class CreateList extends Component {
  constructor() {
    super();
  }

  render() {
    return(
      <div className='background'>
        <NavBar />


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

export default CreateList;
