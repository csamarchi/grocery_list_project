import React, {Component} from 'react';
import './style.css';
// import { CirclePicker } from 'react-color';
import Edit from '@material-ui/icons/Edit';
import ColorPicker from './color.js';
import CreateCategory from '../CreateCategory';
import Close from '@material-ui/icons/Close';
import { Tooltip } from '@material-ui/core';

class List extends Component {

  constructor(props) {
    super(props);
    this.state={
      name: '',
      _id: this.props.data._id,
      background: props.data.color,
      list: props.data,
      isEditing: false,
      categoryName: '',
    }
  }

  //Add an item
  handleSubmit = async (e, name, id, i) => {
    e.preventDefault();
    let reqData = {
      listID: this.state._id,
      categoryID: id,
      item: this.state.name
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
              list: itemResponse.data,
              name: ''
            })
      this.handleChange(e);
    } catch(err) {
      console.log(err);
    }
  }

  handleChange = (e) => {
    this.setState({ [e.currentTarget.name]: e.currentTarget.value })
    e.currentTarget.name = ''
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
      this.setState({
                     background: list.data.color,
                   })
    }).catch((err) => {
      console.log(err);
    })
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
      categories: this.state.list.categories
    };
    this.removeFromState(item, list, catId, categoryItemIndex, categoryIndex)
    const deleteItem = await fetch('http://localhost:9000/deleteItem', {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(sendData),
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  // Remove list item onClick from the client side
  removeFromState = (item, id, category, categoryIndex, categoryItemIndex) => {
    let categories = this.state.list.categories;
    categories[categoryIndex].items.splice(categoryItemIndex, 1)
    this.setState({
      count: 'rerender'
    })
  }

  //Delete Category
  deleteCategory = async (e, itemID, name) => {
    e.preventDefault();
    let data = {
                id: itemID,
                name: this.state.list.name,
                category: name,
                listID: this.state._id
              };
    const deleteCategory = await fetch('http://localhost:9000/deleteCategory', {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const responseList = await deleteCategory.json();
    this.setState({
      list: responseList.data
    })
  }

  updateState = (data) => {
    this.setState({
      list: data,
    })
  }

  handleEdit = async (e) => {
    e.preventDefault();
    const data = {
      name: this.state.name,
      listID: this.state._id
    };
    const editList = await fetch('http://localhost:9000/edit', {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const editResponse = await editList.json();
    // console.log(editResponse);
    this.setState({
      list: {
        ...this.state.list,
        name: data.name,
      },
    })
  }

  toggleEdit = () => {
    this.setState({ isEditing: !this.state.isEditing })
  }

  handleColorChange = (color) => {
    this.setState({ background: color.hex });
  };


  handleUpdate = async (color) => {
    const data = {
      color: this.state.background,
      listID: this.state._id
    };

    const updateColor = await fetch('http://localhost:9000/listcolor', {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }


  render() {
    //console.log(this.state, '456789');
    const data = this.state.list.categories;
    let categoryList = data.map((item, i) =>
      <div className='category' key={i}>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <h1 style={{ textTransform: 'capitalize'}}><b> {item.name} </b></h1>
          <Tooltip title='Delete List' placement="top">
            <Close
              onClick={e => this.deleteCategory(e, item._id, item.name)}
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
                <Close
                  onClick={() => this.handleDeleteItem(listItem, this.state._id, item._id, i, key)}
                  className='cancel'
                  style={{fontSize: '1.1rem', marginLeft: '3px'}}
                />
              </Tooltip>
            </div>
          )}
      </div>
  )

    return(
      <div className='background' style={{background: this.state.background}}>
        <div className='title'>
          <h1 className='listName'> {this.state.list.name} </h1>
          <Edit className='edit' onClick={this.toggleEdit} />
          { this.state.isEditing ?
            <div >
            <form onSubmit={this.handleEdit} style={{marginRight: '-320px'}}>
              <input onChange={this.handleChange} type='text' name='name' placeholder='edit name' className='editInput' style={{ backgroundColor: `${this.state.background}`}}/>
              <button className='saveColor' > Save </button>
              <Close onClick={this.toggleEdit} className='cancel'/>
            </form>
            </div> : null
          }
        </div>
          <ColorPicker
            handleUpdate={this.handleUpdate}
            onChange={this.handleColorChange}
          />
          <CreateCategory
            list={this.state.list}
            id={this.state._id}
            getList={this.getList}
            updateState={this.updateState}
          />
          <div className='categoryWrapper' style={{background: this.state.background}}>
            {categoryList}
          </div>
      </div>
    )
  }
}

export default List;
