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
      // category: '',
      name: '',
      _id: this.props.data._id,
      // list: {
      //   categories: [ {name: ''} ],
      //   name: this.props.data.name,
      // },
      background: props.data.color,
      list: props.data,
      // background: 'rgba(243,249,251,.5)',
      isEditing: false,
      categoryName: '',
    }
  }

  handleSubmit = async (e) => {
    // e.preventDefault();
    // console.log(this.state.category, this.state.name)
    // let data = this.state.list;
    // let category = this.state.category;
    // data[category].push(this.state.name);
    try {
      const addItem = await fetch('http://localhost:9000/addItem', {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(this.state),
        headers: {
          'Content-Type': 'application/json'
        }
      });
    } catch(err) {
      console.log(err);
    }
  }

  handleChange = (e) => {
    this.setState({ [e.currentTarget.name]: e.currentTarget.value })
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
  deleteItem = async (item, id, category) => {
    const sendData = {
      item: item,
      id: id,
      category: category
    };
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

  // Remove list item onClick from the client side
  removeFromState = (item, id, category) => {
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

  //Delete Category
  deleteCategory = async (e, itemID) => {
    console.log(itemID);
    const deleteCategory = await fetch('http://localhost:9000/' + itemID, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const responseList = await deleteCategory.json();
    await  console.log(deleteCategory, '56789');
  }

//Updating state for adding Category function in CreateCategory component
  updateState = (data) => {
    this.setState({
      list: data
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
    // console.log(data, 'DATTAATATATATATA')
    let categoryList = data.map((item, key) =>
      <div className='category' key={key}>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <h1 style={{ textTransform: 'capitalize'}}><b> {item.name} </b></h1>
          <Tooltip title='Delete List' placement="top">
            <Close
              onClick={e => this.deleteCategory(e, item._id)}
              className='cancel'
            />
          </Tooltip>
        </div>
          <form>
            <input className='addItemInput' type='text' name='name' placeholder='your item..' onChange={this.handleChange}/>
          </form>

      </div>
  )

    // let categoryList = Object.keys(data).splice(0, 9).map((item, idx) =>
    //       <div className='category' key={idx}>
    //         <h1 style={{ textTransform: 'capitalize'}}> {item} </h1>
    //         <div className='itemWraper'>
    //           {data[item].map((value) =>
    //             <div key={value} style={{display: 'flex'}}>
    //               <p className='item'> {value} </p>
    //               <button
    //                 className='deleteButton'
    //                 item={value} id={this.state._id}
    //                 onClick={() => this.deleteItem(value, this.state._id, item)}>
    //                   X
    //               </button>
    //             </div>
    //           )}
    //         </div>
    //       </div>
    //     )
    // let category = Object.keys(data).splice(0, 9).map((item) =>
    //   <option key={item} value={item}>{item}</option>
    // )

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

// <div className='wrapper'>
//   <form onSubmit={this.handleSubmit}>
//     <input className='addItemInput' type='text' name='name' placeholder='your item..' onChange={this.handleChange}/>
//     <div className="select">
//       <select name='category' onChange={this.handleChange}>
//         <option> Choose a category </option>
//           {category}
//       </select>
//     </div>
//     <button className='addItemButton'> + </button>
//   </form>
// </div>
// <div className='categoryWrapper' style={{background: this.state.background}}>
//     {categoryList}
// </div>
