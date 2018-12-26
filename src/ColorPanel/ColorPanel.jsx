import React, { Component } from 'react'
import firebase from '../firebase'
import {connect} from 'react-redux'
import { Sidebar, Divider, Button, Menu, Modal, Segment, Label, Icon } from 'semantic-ui-react';
import {TwitterPicker} from 'react-color'

class ColorPanel extends Component {

  state = {
    modal: false,
    primary: '',
    secondary: '',
    userRef: firebase.database().ref('user'),
  }

  openModal = () => this.setState({modal: true})

  closeModal = () => this.setState({ modal: false})

  handleChangePrimaryColor = color => {
    this.setState({ primary: color.hex})
  }

  handleChangeSecondaryColor = color => {
    this.setState({secondary: color.hex})
  }

  handleSaveColor = () => {
    if (this.state.primary && this.state.secondary) {
      this.saveColors(this.state.primary, this.state.secondary)
    }
  }

  saveColors = (primary, secondary) => {
    this.state.userRef
    .child(`${this.props.currentUser.uid}/colors`)
    .push()
    .update({
      primary, 
      secondary
    })
    .then(() => {
      console.log('Color Added')
      this.closeModal();
    })
    .catch(err => console.log(err))
  }

  render() {
    const {modal, primary, secondary} = this.state
    return (
      <Sidebar
        as={Menu}
        icon='labeled'
        inverted
        visible
        vertical
        width='very thin'>
        <Divider/>
          <Button icon='add' size='small' color='blue' onClick={this.openModal}/>

          <Modal basic open={modal} onClose={this.closeModal}>
            <Modal.Header>Choose App Colors</Modal.Header>
            <Modal.Content>
              <Segment>
                <Label content='Primary Color'/>
                <TwitterPicker onChange={this.handleChangePrimaryColor} color={primary}/>
              </Segment>
              <Segment>
                <Label content='Secondary Color'/>
                <TwitterPicker onChange={this.handleChangeSecondaryColor} color={secondary}/>
              </Segment>
            </Modal.Content>
            <Modal.Actions>
              <Button color='green' inverted onClick={this.handleSaveColor}> 
                <Icon name='checkmark'/> Save Color
              </Button>
              <Button color='red' inverted onClick={this.closeModal}> 
                <Icon name='remove'/> Cansel
              </Button>
            </Modal.Actions>
          </Modal>
      </Sidebar>
    )
  }
}

function MSTP (state) {
  return {
    // currentChannel: state.channel,
    currentUser: state.user.currentUser,
  }
}

export default connect(MSTP)(ColorPanel)