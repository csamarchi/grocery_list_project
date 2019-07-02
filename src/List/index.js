import React, {Component} from 'react';
import './style.css';
import { CirclePicker } from 'react-color';

class List extends Component {

  constructor(props) {
    super(props);
    this.state={
      category: '',
      name: '',
      _id: this.props.data._id,
      list: [],
      background: 'rgba(243,249,251,.5)',
      displayColorPicker: false,
      color: ''
    }
  }

  handleSubmit = async (e) => {
    const data = this.state.list;
    try {
      const addItem = await fetch('http://localhost:9000/addItem', {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(this.state),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      this.setState({list: data})
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

// send a fetch request to the server to remove a list item on onClick
// invoke removeFromState with THREE arguments
  deleteItem = async (item, id, category) => {
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

  // addToState = (item, category) => {
  //   console.log(item, category);
  //   for (let key in this.state.list) {
  //     if (key === category) {
  //       this.state.lis[key].push(item)
  //     }
  //   }
  // }

  handleChangeComplete = (color) => {
    this.setState({
      background: color.hex,
      color: color.hex
     });
     console.log(this.state.color);
  };

  handleClick = () => {
  this.setState({ displayColorPicker: !this.state.displayColorPicker })
};

  handleClose = () => {
    this.setState({ displayColorPicker: false })
  };

  handleUpdate = async () => {
    const data = {color: 'hex'};

    const updateColor = await fetch('http://localhost:9000/listColor', {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }


  // Remove list item onClick from the client side
  removeFromState = (item, id, category) => {
    //console.log(item, id, category);
    for (let key in this.state.list) {
        if(key === category) {
          let index = this.state.list[key].indexOf(item);
          this.state.list[key].splice(index, 1);
        }
      }
      this.setState({
        count: 'rerender'
      })
  }

  render() {
    console.log(this.state.color);
    let data = this.state.list
    let categoryList = Object.keys(data).splice(0, 9).map((item) =>
          <div className='category' key={item}>
            <h1 style={{ textTransform: 'capitalize'}}> {item} </h1>
            <div className='itemWraper'>
              {data[item].map((value) =>
                <div key={value} style={{display: 'flex'}}>
                  <p className='item'> {value} </p>
                  <button className='deleteButton' item={value} id={this.state._id} onClick={() => this.deleteItem(value, this.state._id, item)}>X</button>
                </div>
              )}
            </div>
          </div>
        )
    let category = Object.keys(data).splice(0, 9).map((item) =>
      <option key={item} value={item}>{item}</option>
    )

    return(
      <div className='background' style={{background: this.state.background}}>
          <h1 className='listName'> {this.props.data.name} </h1>
          <div className='colorWrapper'>
            <div className='swatch' onClick={ this.handleClick }>
              <h1> Change background </h1>
              <div className='color' style={{background: this.state.background}} />
            </div>
            <button onClick={this.handleUpdate}> Save </button>
            { this.state.displayColorPicker ?
              <div className='popover'>
                <div className='cover' onClick={ this.handleClose }/>
                  <CirclePicker color={ this.state.background } onChangeComplete={ this.handleChangeComplete } handleColorChange={this.handleColorChange}/>
                </div> : null }
          </div>
          <div className='wrapper'>
            <form>
              <input className='addItemInput' type='text' name='name' placeholder='your item..' onChange={this.handleChange}/>
              <div className="select">
                <select name='category' onChange={this.handleChange}>
                  <option> Choose a category </option>
                    {category}
                </select>
              </div>
              <button onClick={this.handleSubmit} className='addItemButton'> + </button>
            </form>
          </div>
          <div className='categoryWrapper'>
              {categoryList}
          </div>
      </div>
    )
  }
}

export default List;
