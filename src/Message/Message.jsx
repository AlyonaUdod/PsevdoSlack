import React, { Component } from 'react'
import MessageHeader from '../MessageHeader/MessageHeader'
import { Segment, Comment } from 'semantic-ui-react';
import MessageForm from '../MessageForm/MessageForm';
import firebase from '../firebase'
import {connect} from 'react-redux'
import SingleMessage from '../SingleMessage/SingleMessage';

class Message extends Component {

  state = {
    messagesRef: firebase.database().ref('messages'),
    loading: true,
    messages: [],
    seachMsg: [],
    countUser: '',
    seachTemp: '',
  }
  
  seachTempChange = (e) => {
    let value = e.target.value 
    this.setState({
      seachTemp: value.toLowerCase(),
    }, () => this.seachMessege() )
  }

  seachMessege = () => {
    let arr = this.state.messages.filter(el => el.content ? el.content.toLowerCase().includes(this.state.seachTemp) : null)
    console.log(arr)
    this.setState({
      seachMsg: arr,
    })
  }

  componentDidMount () {
    setTimeout(() => {
      const {currentChannel, currentUser} = this.props;
      if (currentChannel && currentUser) {
        this.addListeners(currentChannel.id)
      }
    }, 1000)
  }

  componentDidUpdate (prevProps) {
    if (prevProps.currentChannel && this.props.currentChannel) {
      // (console.log('new one'))
        if (prevProps.currentChannel.name !== this.props.currentChannel.name) {
          // (console.log('second one'))
          this.addListeners(this.props.currentChannel.id)
        }
    }
  }

  // checkMsg = (channelId) => { 
  //   this.state.messagesRef.child(channelId).on('value', snap => {
  //       if(snap.exists()) {
  //         this.addListeners(channelId)
  //         }
  //       })
  //   this.setState({
  //       messages: [],
  //       loading: false,
  //   }, () => this.countUnicUsers(this.state.messages))
  // }
 
  // addListeners = (channelId) => {
  //   let loadedMessages = []; 
  //   this.state.messagesRef.child(channelId).on('child_added', snap => {
  //       console.log('aaaaa = true')
  //       loadedMessages.push(snap.val())
  //       this.setState({
  //         messages: loadedMessages,
  //         loading: false,
  //       }, () => this.countUnicUsers(this.state.messages))
  //     })
  // }

  addListeners = (channelId) => {
    let loadedMessages = [];

    // this.state.messagesRef.child(channelId).on('value', snap => console.log(snap.exists()))

    this.state.messagesRef.child(channelId).once('value').then(snap => {
      if (snap.exists()) {
        this.state.messagesRef.child(channelId).on('child_added', snap => {
            // console.log('aaaaa')
            loadedMessages.push(snap.val())
            this.setState({
              messages: loadedMessages,
              loading: false,
            }, () => this.countUnicUsers(this.state.messages))
          })
      } else {
        this.setState({
              messages: [],
              loading: false,
            }, () => this.countUnicUsers(this.state.messages))
      } 
    })
  }
  

  countUnicUsers = messages => {
    const iniqueUsers = messages.reduce((acc, el) => {
      if (!acc.includes(el.user.name)) {
        acc.push(el.user.name)
      }
      return acc
    }, []) 
    this.setState({
      countUser: `${iniqueUsers.length} users`
    })
  }

  render() {
    const {messagesRef, messages, countUser, seachTemp, seachMsg} = this.state;
    return (
        <React.Fragment>
           <MessageHeader countUser={countUser} seachTemp={seachTemp} seachTempChange={this.seachTempChange}/>
           <Segment>
             <Comment.Group className='messages'>
             { messages.length > 0 && !seachTemp && messages.map(el => <SingleMessage key={el.time} message={el} user={this.props.currentUser}/>)}
             { seachTemp && seachMsg.map(el => <SingleMessage key={el.time} message={el} user={this.props.currentUser}/>)} 
             { seachTemp && seachMsg.length === 0 && <div style={{fontSize:'1.3rem'}}># No message found</div>}
             </Comment.Group>
           </Segment>
           <MessageForm messagesRef={messagesRef} toggleModal={this.toggleModal}/>
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