import React, {Component} from 'react';
import './style.css';
import Close from '@material-ui/icons/Close';
import { Tooltip } from '@material-ui/core';

class Categories extends Component {

  constructor(props) {
    super(props);
    this.state={
      displayColorPicker: false,
      item: props.item,
      i: props.i,
      name: '',
    }
  }

  //Add an item
  handleSubmit = async (e, name, id, i) => {
    e.preventDefault();
    let reqData = {
      listID: this.props._id,
      categoryID: id,
      item: this.state.name,
      categoryIndex: i
    }
    try {
      const addItem = await fetch('http://localhost:9000/addItem', {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(reqData),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      let itemResponse = await addItem.json();
      this.setState({
              item: itemResponse.data,
              name: ''
            })
    } catch(err) {
      console.log(err);
    }
  }

  handleChange = (e) => {
    this.setState({ [e.currentTarget.name]: e.currentTarget.value })
  }

  // send a fetch request to the server to remove a list item on onClick
  // invoke removeFromState with THREE arguments
    handleDeleteItem = async (item, list, catId, categoryItemIndex, categoryIndex) => {
      const sendData = {
        item: item,
        list: list,
        catId: catId,
        categoryIndex: categoryIndex,
        categoryItemIndex: categoryItemIndex,
        categories: this.state.item.items
      };
      let deleteItem = await fetch('http://localhost:9000/deleteItem', {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(sendData),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      let deleteItemResponse = await deleteItem.json();
      await this.setState({
        item: deleteItemResponse.data
      })
    }


  render() {
    let item = this.state.item;
    let i = this.state.i;

    return(
      <div className='categoryWrapper' style={{background: this.state.background}}>
        <div className='category' key={i}>
          <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <h1 style={{ textTransform: 'capitalize'}}><b> {item.name} </b></h1>
            <Tooltip title='Delete List' placement="top">
              <Close
                onClick={e => this.props.deleteCategory(e, item._id, item.name)}
                className='cancel'
              />
            </Tooltip>
          </div>
            <form
              onSubmit={(e) => this.handleSubmit(e, item.name, item._id, i)}
              style={{ display: 'flex' }}
            >
              <input
                className='addItemInput'
                type='text'
                value={this.state.name}
                name='name'
                placeholder='your item..'
                onChange={this.handleChange}
              />
              <button className='addItemButton'> + </button>
            </form>
            <hr />
            {item.items.map((listItem, key) =>
              <div className='itemDivs' key={key}>
                <h1 style={{ textTransform: 'capitalize'}}> {listItem} </h1>
                <Tooltip title='Delete Item' placement="top">
                  <Close                               /* item, list, catId, categoryItemIndex, categoryIndex */
                    onClick={() => this.handleDeleteItem(listItem, this.props._id, item._id, key, i)}
                    className='cancel'
                    style={{fontSize: '1.1rem', marginLeft: '3px'}}
                  />
                </Tooltip>
              </div>
            )}
        </div>
      </div>
    )
  }
}

export default Categories;
