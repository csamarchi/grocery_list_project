import React, { Component } from 'react';

class ListCategory extends Component {

  constructor(props) {
    console.log(props.list, 'MIRZA!@###$')
    super(props);
    this.state = {
      list: props.list
    };

  }

  // deleteItem = async (item, id, category) => {
  //     console.log(item, id, category);
  //     const sendData = {
  //       item: item,
  //       id: id,
  //       category: category
  //     };
  //     console.log(sendData)
  //
  //     this.removeFromState(id, category)
  //     const deleteItem = await fetch('http://localhost:9000/deleteItem', {
  //       method: 'POST',
  //       credentials: 'include',
  //       body: JSON.stringify(sendData),
  //       headers: {
  //         'Content-Type': 'application/json'
  //       }
  //     })
  //   }
  
  removeFromState = (item, id, category) => {
      for (let key in this.state.list) {
          if(key === category) {
            let index = this.state.list[key].indexOf(item);
            this.state.list[key].splice(index, 1);
            console.log(this.state.list.meats);
          }
        }
        this.setState({
          count: 'rerender'
        })
    }
    componentDidMount() {

    }
    render() {

  return (
    <div className='category'>
    {console.log('second')}
      <h1> Produce </h1>
      {this.state.list.produce ?  this.state.list.produce.map((item) => <div> <p>{item}</p> <button item={item} id={this.state.list._id} onClick={() => this.deleteItem(item, this.state.list._id, 'produce')}>Delete</button> </div>) : null}
    </div>
  )
}
}


export default ListCategory;
