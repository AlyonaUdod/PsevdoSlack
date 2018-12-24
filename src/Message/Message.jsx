import React, { Component } from 'react'
import MessageHeader from '../MessageHeader/MessageHeader'
import { Segment, Comment } from 'semantic-ui-react';
import MessageForm from '../MessageForm/MessageForm';
import firebase from '../firebase'

export default class Message extends Component {

  state = {
    messagesRef: firebase.database().ref('messages')
  }
  

  render() {
    const {messagesRef} = this.state;
    return (
        <React.Fragment>
           <MessageHeader/>
           <Segment>
             <Comment.Group className='messages'>
             </Comment.Group>
           </Segment>
           <MessageForm messagesRef={messagesRef}/>
        </React.Fragment>
    )
  }
}
