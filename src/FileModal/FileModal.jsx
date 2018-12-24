import React, { Component } from 'react'
import { Modal, Input, Button, Icon } from 'semantic-ui-react';

export default class FileModal extends Component {

  render() {

    const { modal, closeModal} = this.props

    return (
     <Modal open={modal} onClose={closeModal}>
        <Modal.Header>Select An Image File</Modal.Header>
        <Modal.Content>
            <Input fluid label='File types: jpg, png' name='file' type='type' />
        </Modal.Content>
        <Modal.Actions>
            <Button color='green' inverted>
                <Icon name='checkmark'/> Send
            </Button>
            <Button color='red' inverted onClick={closeModal}>
                <Icon name='remove'/> Cancel
            </Button>
        </Modal.Actions>

     </Modal>
    )
  }
}
