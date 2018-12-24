import React, { Component } from 'react'
import { Segment, Button, Input } from 'semantic-ui-react';
import {connect} from 'react-redux'
import firebase from '../firebase'

class MessageForm extends Component {

    state = {
        message: '',
        loading: false,
        errors: [],
    }

    handleChange = (e) => {
        this.setState({
            message: e.target.value
        })
    }

    createMessage = () => {
        const message = {
            content: this.state.message,
            time: firebase.database.ServerValue.TIMESTAMP,
            user: {
                id: this.props.currentUser.uid,
                name: this.props.currentUser.displayName,
                avatar: this.props.currentUser.photoURL,
            }
        }
        console.log(message)
        return message
    }

    sendMessage = () => {
        const {messagesRef, currentChannel} = this.props;
        const {message} = this.state

        if (message) {
            this.setState({loading: true})
            messagesRef
            .child(currentChannel.id)
            .push()
            .set(this.createMessage())
            .then(() =>{
                this.setState({loading: false, message: ''})
            })
            .catch(err => {
                this.setState({
                    loading: false,
                    errors: this.state.errors.concat(err)
                }, () => console.log(err))
            })
        }
    }

      
  render() {
    return (
      <Segment className='message__form'>
        <Input
            fluid
            name='message'
            style={{
                marginBottom: '.7rem'
            }}
            label={<Button icon='add'/>}
            labelPosition='left'
            placeholder='Write your message'
            value={this.state.message}
            onChange={this.handleChange}/>
        <Button.Group icon widths='2'>
            <Button color='orange' content='Add Reply' labelPosition='left' icon='edit' onClick={this.sendMessage} />
            <Button color='teal' content='Upload media' labelPosition='right' icon='cloud upload'/>
        </Button.Group>
      </Segment>
    )
  }
}

const MSTP = function (state) {
    return {
        currentUser: state.user.currentUser,
        currentChannel: state.channel,
    }
}

export default connect(MSTP) (MessageForm)