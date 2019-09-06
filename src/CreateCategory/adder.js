import React, {Component} from 'react';
import './style.css';

class Adder extends Component {

  constructor(props) {
    super(props);
    this.state={
      displayAdder: false,
    }
  }


  handleClick = () => {
  this.setState({ displayAdder: !this.state.displayAdder })
};

  handleClose = () => {
    this.setState({ displayAdder: false })
  };


  render() {
    return(
      <div>
        { this.state.displayAdder ?
          <div>
            <div onClick={ this.handleClose }/>
                <form className='addForm' onSubmit={this.props.onSubmit}>
                  <input onChange={this.props.handleChange} className='addItemInput' type='text' name='name' placeholder='create a category..' />
                  <button className='addItemButton'> + </button>
                  {/*<button className='cancelItemButton'> x </button>*/}
                </form>
            </div> :
              <div className='addBox' onClick={ this.handleClick }>
                <h1><b> + Add a List </b></h1>
                <div className='color' />
              </div>
          }
      </div>
    )
  }
}

export default Adder;
