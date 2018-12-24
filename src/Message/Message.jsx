import React, { Component } from 'react'
import MessageHeader from '../MessageHeader/MessageHeader'
import { Segment, Comment } from 'semantic-ui-react';
import MessageForm from '../MessageForm/MessageForm';
import firebase from '../firebase'
import {connect} from 'react-redux'
import SingleMessage from '../SingleMessage/SingleMessage';
import FileModal from '../FileModal/FileModal';

class Message extends Component {

  state = {
    messagesRef: firebase.database().ref('messages'),
    loading: true,
    messages: [],
    modal: false,
  }

  componentDidMount () {
    setTimeout(() => {
      const {currentChannel, currentUser} = this.props;
      if (currentChannel && currentUser) {
        this.addListeners(currentChannel.id)
      }
    }, 1000)
  }

  addListeners = channelId => {
    let loadedMessages = [];
    this.state.messagesRef.child(channelId).on('child_added', snap => {
      loadedMessages.push(snap.val())
      this.setState({
        messages: loadedMessages,
        loading: false,
      })
    })
  }

  toggleModal = () => {
    this.setState(prev => ({
      modal: !prev.modal
    }))
  }

  render() {
    const {messagesRef, messages, modal} = this.state;
    return (
        <React.Fragment>
           <MessageHeader/>
           <Segment>
             <Comment.Group className='messages'>
             { messages.length > 0 && messages.map(el => <SingleMessage key={el.time} message={el} user={el.user}/>)}
             </Comment.Group>
           </Segment>
           <MessageForm messagesRef={messagesRef} toggleModal={this.toggleModal}/>
           <FileModal modal={modal} closeModal={this.toggleModal}/>
        </React.Fragment>
    )
  }
}

function MSTP (state) {
  return {
    currentChannel: state.channel,
    currentUser: state.user.currentUser,
  }
}


export default connect(MSTP)(Message)