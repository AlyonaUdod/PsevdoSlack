import React, { Component } from 'react'
import firebase from '../firebase'
import {connect} from 'react-redux'
import { Sidebar, Divider, Button, Menu, Modal, Segment, Label, Icon } from 'semantic-ui-react';
import {SketchPicker} from 'react-color'
import {setColors} from '../redux/actions/setColorsAction'

class ColorPanel extends Component {

  state = {
    modal: false,
    primary: '',
    secondary: '',
    userRef: firebase.database().ref('users'),
    userColors: [],
  }

  componentDidMount () {
    if (this.props.currentUser) {
      this.addListener(this.props.currentUser.uid)
    }
  }

  addListener = userId => {
    let userColors = [];
    this.state.userRef.child(`${userId}/colors`).on('child_added', snap => {
      userColors.unshift(snap.val());
      this.setState({userColors});
    })
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

  displayColors = colors => 
    // console.log(colors)
    colors.length > 0 &&
    colors.map((el,i) => (
      <React.Fragment key={i}>
        <Divider/>
          <div
            className='color__container'
            onClick={() => this.props.setColors(el.primary, el.secondary)}
          > 
            <div className='color__square' style={{background: el.primary}}>
              <div 
                className='color__overlay'
                style={{background: el.secondary}}
              />
            </div>
          </div>
      </React.Fragment>
    ))
  

  render() {
    const {modal, primary, secondary, userColors} = this.state
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
          {this.displayColors(userColors)}
          <Modal basic open={modal} onClose={this.closeModal}>
            <Modal.Header>Choose App Colors</Modal.Header>
            <Modal.Content>
              <Segment>
                <Label content='Primary Color'/>
                <SketchPicker onChange={this.handleChangePrimaryColor} color={primary}/>
              </Segment>
              <Segment>
                <Label content='Secondary Color'/>
                <SketchPicker onChange={this.handleChangeSecondaryColor} color={secondary}/>
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

const MSTP = state => {
  return {
    currentUser: state.user.currentUser,
  }
}

const MDTP = (dispatch) => {
  return {
    setColors: function(a, b){
      dispatch(setColors(a, b))
    }
  }
} 

export default connect(MSTP, MDTP)(ColorPanel)