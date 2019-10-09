import React, {Component} from 'react';
import './style.css';
import Close from '@material-ui/icons/Close';
import Button from "@material-ui/core/Button";
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import AccountCircle from '@material-ui/icons/AccountCircle';
import AddCircle from '@material-ui/icons/AddCircle';


class Collabs extends Component {

  constructor(props) {
    super(props);
    this.state={
      collabSearch: false,
    }
  }


  toggleCollabSearch = () => {
    this.setState({ collabSearch: !this.state.collabSearch })
  }

  handleClose = () => {
    this.setState({ collabSearch: false })
  };


  render() {
    console.log(this.props.collabs);
    return(
      <div>
      { this.state.collabSearch ?
          <div className='collaborators'>
          <form onSubmit={this.props.searchCollaborators}>
            <FormControl>
              <InputLabel htmlFor="input-with-icon-adornment">Add collaborators</InputLabel>
              <Input
                onChange={this.props.handleChange}
                id="input-with-icon-adornment"
                name='name'
                startAdornment={
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                }
              />
              <div>
                <Button type='submit'> search </Button>
                <Close
                  className='cancel'
                  onClick={this.handleClose}
                />
              </div>
              { this.props.collab ?
                this.props.collabs.map((item, key)=> {
                  console.log('hello', this.props.collabs);
                  return(
                  <div
                    key={key}
                    onClick={(e) => this.props.handleConfirmCollab(e, item.username)}
                    className='collabAdd'
                  >
                    <AddCircle className='addCircle' />
                    <div className='possibleCollab' >{item.username}</div>
                  </div>
                  )
                }) : null
                }
            </FormControl>
          </form>
        </div> :
        <button className='collabAddBox' onClick={this.toggleCollabSearch}> Add Collaborators </button>
      }
    </div>
    )
  }
}

export default Collabs;
