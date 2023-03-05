import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function ModalImg({urlImg,showModalImg,handleClose,title}) {
 

  return (
    <div>
      <Modal show={showModalImg} onHide={handleClose} size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <img src={urlImg}
         className='img-fluid shadow-4' alt='...' />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>          
        </Modal.Footer>
      </Modal>
    </div>
  );
}

