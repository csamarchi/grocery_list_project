/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './style.css';

const ModalExample = (props) => {
  const {
    className,
    handleChange,
    handleSubmit
  } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);


  return (

    <div>
      {/* <Button color="danger" onClick={toggle}>HELOOOOOOOOOO</Button> */}
      <div onClick={toggle} className='addDiv'>
            <h1 style={{fontSize: '2em', marginTop: '6px'}}><b> Add a List</b></h1>
            <h1 style={{fontSize: '3em'}}> + </h1>
          </div>
      <Modal isOpen={modal} toggle={toggle} className={className} >
        <ModalHeader toggle={toggle}>Create a List</ModalHeader>
        <ModalBody className='createForm'>
          <form onSubmit={handleSubmit}>
              <h1 className='nameListText'>Name your list: </h1>
              <input type='text' name='name' placeholder='type something..' onChange={handleChange}/>
              <input className='createButton'type='Submit' value='Create' />
          </form>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default ModalExample;
