import React, { Component } from 'react'
import { Menu, Icon, Modal, Segment, Button, Form} from 'semantic-ui-react';
import firebase from '../firebase'
import {connect} from 'react-redux'
import {setCurrentChannel} from '../redux/actions/setCurrentChannelAction'

class Channels extends Component {

     state = {
        channels: [],
        modal: false,
        channel: '',
        about: '',
        channelsRef: firebase.database().ref('channels'),
        activeChannel: '',
        firstLoad: true,
      }

      componentDidMount () {
          this.addListeners()
      }

      componentWillUnmount () {
        this.removeListeners()
      }

      removeListeners = () => {
        this.state.channelsRef.off();
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
            // console.log('succses')
            this.addChannel()
        } 
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
                active: false,
            })
            this.toggleModal()
            console.log('channel added')
        })
        .catch(err=> console.log(err))
      }

      addListeners = () => {
        let loadedChannels = []
        this.state.channelsRef.on('child_added', snap => {
            loadedChannels.push(snap.val())
            console.log(loadedChannels);
            this.setState({
                channels: loadedChannels
            }, () => (this.loadFirstChannel()))
        })

        console.log(this.state.channels)

        // this.props.setChannelToStore(this.state.channels[0])
      }
    
      loadFirstChannel = () => {
          if(this.state.firstLoad && this.state.channels.length > 0) {
            this.props.setChannelToStore(this.state.channels[0]);
            this.showActiveChannel(this.state.channels[0])
          }
          this.setState ({
              firstLoad: false,
          })
      }

      showActiveChannel = (channel) => {
        this.setState({
            activeChannel: channel.id
        })
      }

      changeActiveChannel = (el) => {
        this.props.setChannelToStore(el);
        this.showActiveChannel(el) 
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
                {channels.length > 0 && channels.map(el => (
                    <Menu.Item 
                    key={el.id}
                    name={el.name}
                    style={{opacity:.7}}
                    active = {el.id === this.state.activeChannel}
                    onClick={() => this.changeActiveChannel(el)}
                    >
                    # {el.name}
                    </Menu.Item>
                ))}
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
      channel: state.channel
    }
  }

function MDTP (dispatch) {
    return {
        setChannelToStore: function(data) {
            dispatch(setCurrentChannel(data))
        }
    }
}


export default connect(MSTP, MDTP)(Channels)