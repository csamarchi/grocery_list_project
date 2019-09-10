import React, {Component} from 'react';
import './style.css';
import { CirclePicker } from 'react-color';
import Close from '@material-ui/icons/Close';

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
        { this.state.displayColorPicker ?
          <div className='popover'>
            <CirclePicker onChangeComplete={ this.props.onChange } />
            <button className='saveColor' onClick={this.props.handleUpdate}> Save </button>
            <Close onClick={this.handleClose} className='cancel'/>
          </div> : null
        }
      </div>
    )
  }
}

export default ColorPicker;
