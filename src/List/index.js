import React, {Component} from 'react';
import './style.css';
// import { CirclePicker } from 'react-color';
import Edit from '@material-ui/icons/Edit';
import ColorPicker from './color.js';
import CreateCategory from '../CreateCategory';
import Close from '@material-ui/icons/Close';
import { Tooltip } from '@material-ui/core';
import Categories from './categories.js';

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
      username: '',
      collab: false
    }
  }


  handleChange = (e) => {
    this.setState({ [e.currentTarget.name]: e.currentTarget.value })
    console.log(this.state)
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

  searchCollaborators = async (e) => {
    e.preventDefault();
    console.log(this.state)
    // try {
      const searchCollaborators = await fetch('http://localhost:9000/collab', {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({name: this.state.name}),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const searchCollaboratorsJson = await searchCollaborators.json()
      await console.log(searchCollaboratorsJson, 'collab')

      await this.setState({
        collabs: searchCollaboratorsJson.data,
        collab: true
      })
    //   // return searchCollaboratorsJson;
    // } catch(err) {
    //   console.log(err);
    // }
  }

  handleConfirmCollab = async (e, username) => {
    e.preventDefault();
    const confirmCollaborators = await fetch('http://localhost:9000/confirmCollab', {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({username: username, listID: this.state._id}),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const confirmCollaboratorsJson = await confirmCollaborators.json()
    await console.log(confirmCollaboratorsJson, 'collab')
  }


  render() {
    //console.log(this.state, '456789');
    const data = this.state.list.categories;
    let categoryList = data.map((item, i) =>
      <Categories
        item={item}
        i={i}
        deleteCategory={this.deleteCategory}
        _id={this.state._id}
        key={i}
      />
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
        <div className='collaboratorsWrap'>
          <div className='collaborators'>
            <form onSubmit={this.searchCollaborators}>
              <input onChange={this.handleChange} type='text' name='name' placeholder='search collaborators' className='collabInput' />
               { this.state.collab ? 
                this.state.collabs.map((item)=> {
                  return(
                  <div className='possibleCollab' onClick={(e) => this.handleConfirmCollab(e, item.username)} >{item.username}</div>
                  )
                }) : null
               } 
            </form>
          </div>
          <ColorPicker
            handleUpdate={this.handleUpdate}
            onChange={this.handleColorChange}
          />
        </div>
        
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
