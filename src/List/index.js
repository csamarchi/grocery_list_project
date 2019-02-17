import React, {Component} from 'react';
import NavBar from '../NavBar';
import './style.css';

class List extends Component {

  constructor(props) {
    super(props);
    this.state={
      category: '',
      name: '',
      _id: this.props.data._id,
      list: [],
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

  getList = async () => {
    try {
      const getItem = await fetch('http://localhost:9000/' + this.state._id, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const getItemJson = getItem.json()
      return getItemJson;
    } catch(err) {
      console.log(err);
    }
  }

  componentDidMount() {
    this.getList().then((list) => {

      this.setState({list: list.data})


    }).catch((err) => {
      console.log(err);
    })
  }

  deleteItem = async (item, id, category) => {
    console.log(item, id, category);
    const sendData = {
      item: item,
      id: id,
      category: category
    };
    console.log(sendData)

    this.removeFromState(item, id, category)
    const deleteItem = await fetch('http://localhost:9000/deleteItem', {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(sendData),
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
  removeFromState = (item, id, category) => {
    for (let key in this.state.list) {
        if(key === category) {
          let index = this.state.list[key].indexOf(item);
          this.state.list[key].splice(index, 1);
          console.log(this.state.list.meats);
        }
      }
      this.setState({
        count: 1
      })
  }

  render() {



    return(
      <div className='background'>
          <h1 className='listName'> {this.props.data.name} </h1>
          <div className='wrapper'>
            <form onSubmit={this.handleSubmit}>
              <input className='addItemInput'type='text' name='name' placeholder='your item..' onChange={this.handleChange}/>
              <div className="select">
                <select name='category' onChange={this.handleChange}>
                  <option> Choose a category </option>
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
              </div>
              <input className='addItemButton' type='Submit' value='+'/>
            </form>
          </div>
            <div className='categoryWrapper'>
                <div className='category'>
                  <h1> Produce </h1>
                  {this.state.list.produce ?  this.state.list.produce.map((item) => <div> <p>{item}</p> <button item={item} id={this.state._id} onClick={() => this.deleteItem(item, this.state._id, 'produce')}>Submit</button> </div>) : null}
                </div>
                <div className='category'>
                  <h1> Meats </h1>
                  {this.state.list.meats ?  this.state.list.meats.map((item) => <div> <p>{item}</p> <button item={item} id={this.state._id} onClick={() => this.deleteItem(item, this.state._id, 'meats')}>Submit</button> </div>) : null}
                </div>
                <div className='category'>
                  <h1> Deli </h1>
                  {this.state.list.deli ?  this.state.list.deli.map((item) => <div> <p>{item}</p> <button item={item} id={this.state._id} onClick={() => this.deleteItem(item, this.state._id, 'deli')}>Submit</button> </div>) : null}
                </div>
                <div className='category'>
                  <h1> Dairy </h1>
                  {this.state.list.dairy ?  this.state.list.dairy.map((item) => <div> <p>{item}</p> <button item={item} id={this.state._id} onClick={() => this.deleteItem(item, this.state._id, 'dairy')}>Submit</button> </div>) : null}
                </div>
                <div className='category'>
                  <h1> Bakery </h1>
                  {this.state.list.bakery ?  this.state.list.bakery.map((item) => <div> <p>{item}</p> <button item={item} id={this.state._id} onClick={() => this.deleteItem(item, this.state._id, 'bakery')}>Submit</button> </div>) : null}
                </div>
                <div className='category'>
                  <h1> Frozen </h1>
                  {this.state.list.frozen ?  this.state.list.frozen.map((item) => <div> <p>{item}</p> <button item={item} id={this.state._id} onClick={() => this.deleteItem(item, this.state._id, 'frozen')}>Submit</button> </div>) : null}
                </div>
                <div className='category'>
                  <h1> Dry Goods </h1>
                  {this.state.list.dryGoods ?  this.state.list.dryGoods.map((item) => <div> <p>{item}</p> <button item={item} id={this.state._id} onClick={() => this.deleteItem(item, this.state._id, 'dryGoods')}>Submit</button> </div>) : null}
                </div>
                <div className='category'>
                  <h1> Drinks </h1>
                  {this.state.list.drinks ?  this.state.list.drinks.map((item) => <div> <p>{item}</p> <button item={item} id={this.state._id} onClick={() => this.deleteItem(item, this.state._id, 'drinks')}>Submit</button> </div>) : null}
                </div>
                <div className='category'>
                  <h1> Alcohol </h1>
                  {this.state.list.alcohol ?  this.state.list.alcohol.map((item) => <div> <p>{item}</p> <button item={item} id={this.state._id} onClick={() => this.deleteItem(item, this.state._id, 'alcohol')}>Submit</button> </div>) : null}
                </div>
                <div className='category'>
                  <h1> General </h1>
                  {this.state.list.general ?  this.state.list.general.map((item) => <div> <p>{item}</p> <button item={item} id={this.state._id} onClick={() => this.deleteItem(item, this.state._id, 'general')}>Submit</button> </div>) : null}
                </div>
            </div>
      </div>
    )
  }
}

export default List;



// console.log(this.props.data._id, 'COFFEEE')
// const showItem = this.state.list.map((item, i) => {
//   return (
//     <h2> item.name </h2>
//   )
// })
