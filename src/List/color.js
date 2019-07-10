import React, {Component} from 'react';
import './style.css';
import { CirclePicker } from 'react-color';

class ColorPicker extends Component {

  constructor(props) {
    super(props);
    this.state={
      displayColorPicker: false,
    }
  }

  handleClick = () => {
  this.setState({ displayColorPicker: !this.state.displayColorPicker })
};

  handleClose = () => {
    this.setState({ displayColorPicker: false })
  };


  render() {
    return(
      <div className='colorWrapper'>
        <div className='swatch' onClick={ this.handleClick }>
          <h1> Change background </h1>
          <div className='color' />
        </div>
        <button className='saveColor' onClick={this.props.handleUpdate}> Save </button>
        { this.state.displayColorPicker ?
          <div className='popover'>
            <div className='cover' onClick={ this.handleClose }/>
              <CirclePicker onChangeComplete={ this.props.onChange } />
            </div> : null }
      </div>
    )
  }
}

export default ColorPicker;
