import React, { Component } from 'react'
import { Menu, Icon, Modal, Segment, Button, Form} from 'semantic-ui-react';
import firebase from '../firebase'
import {connect} from 'react-redux'

class Channels extends Component {

     state = {
        channels: [],
        modal: false,
        channel: '',
        about: '',
        channelsRef: firebase.database().ref('channels')
      }

      handlerChange = (e) => {
        this.setState({
          [e.target.name]: e.target.value,
        })
      }

      toggleModal = () => {
          this.setState(prev =>({
              modal: !prev.modal,
          }))
      }

      handlerSubmit = (e) => {
        e.preventDefault()
        if (this.state.channel && this.state.about) {
            console.log('succses')
            this.addChannel()
        }
        // this.setState(prev=>({
        //     channels: [...prev.channels, {channel: this.state.channel, about: this.state.about}], 
        //     modal: !prev.modal,
        // }))
      }

      addChannel = () => {
        const {channelsRef, channel, about} = this.state
        const key = channelsRef.push().key;
        const newChannel = {
            id: key,
            name: channel,
            details: about,
            createdBy: {
                name: this.props.user.displayName,
                avatar: this.props.user.photoURL,
            }
        }
        console.log(this.props.user)
        console.log(newChannel)

        channelsRef
        .child(key)
        .update(newChannel)
        .then(() => {
            this.setState({
                channel: '',
                about: '',
            })
            this.toggleModal()
            console.log('channel added')
        })
        .catch(err=> console.log(err))
      }


  render() {
      const { channels, modal } = this.state
    return (
        <React.Fragment>
            <Menu.Menu style={{paddingBottom:'2rem'}}>
                <Menu.Item>
                    <span>
                        <Icon name='exchange'/> CHANNELS
                    </span> ({channels.length}) <Icon name='add' onClick={this.toggleModal}/>
                </Menu.Item>
            </Menu.Menu>


            <Modal open={modal} onClose={this.toggleModal}>
                <Modal.Header as='h2' style={{textAlign:'center'}}>
                        Add New Channel 
                </Modal.Header>

                <Modal.Content>
                <Form size='large' onSubmit={this.handlerSubmit}>
                    <Segment>
                    <Form.Input 
                        fluid
                        name='channel'
                        icon='list'
                        iconPosition='left'
                        placeholder="Channel"
                        type='text'
                        onChange={this.handlerChange}
                        />
                    <Form.Input 
                        fluid
                        name='about'
                        icon='pencil'
                        iconPosition='left'
                        placeholder="About"
                        type='text'
                        onChange={this.handlerChange}
                        value={this.state.password}
                        />
                    </Segment>
                </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Button positive size='large' onClick={this.handlerSubmit}>Add channel</Button>
                    <Button negative color='purple' size='large' onClick={this.toggleModal}>Cansel</Button>
                </Modal.Actions>
            </Modal>
        </React.Fragment>
     
    )
  }
}

function MSTP (state) {
    return {
      user: state.user.currentUser,
    }
  }


export default connect(MSTP, null)(Channels)