import React, { Component } from 'react'
import { Segment, Button, Input } from 'semantic-ui-react';
import {connect} from 'react-redux'
import firebase from '../firebase'
import FileModal from '../FileModal/FileModal';
import uuidv4 from 'uuid'


class MessageForm extends Component {

    state = {
        message: '',
        loading: false,
        errors: [],
        modal: false,
        uploadTask: null,
        storageRef: firebase.storage().ref()
    }

    handleChange = (e) => {
        this.setState({
            message: e.target.value
        })
    }

    toggleModal = () => {
        this.setState(prev => ({
          modal: !prev.modal
        }))
    }

    createMessage = (url = null) => {
        const message = {
            // content: this.state.message,
            time: firebase.database.ServerValue.TIMESTAMP,
            user: {
                id: this.props.currentUser.uid,
                name: this.props.currentUser.displayName,
                avatar: this.props.currentUser.photoURL,
            }
        }
        if (url !== null) {
            message['image'] = url 
        } else {
            message['content'] = this.state.message
        }
        // console.log(message)
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

    
    uploadFile = (file, metadata) => {
        // console.log(file, metadata)
        const pathToUpload = this.props.currentChannel.id
        const ref = this.props.messagesRef
        const filePath = `chat/public/image${uuidv4()}.jpg`;
        this.setState({
            uploadTask: this.state.storageRef.child(filePath).put(file, metadata)
        },
        () => {
            this.state.uploadTask.on(
                'state_changed',
                () => {
                    this.state.uploadTask.snapshot.ref
                    .getDownloadURL()
                    .then(downloadUrl => {
                        this.sendFileMessage(downloadUrl, ref, pathToUpload);
                    })
                    .catch(err => {
                        console.log(err)
                    })
                }
            )
        })
    }

    sendFileMessage = (url, ref, path) => {
        ref.child(path)
        .push()
        .set(this.createMessage(url))
        .catch(err => 
            console.log(err))
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
            <Button color='teal' content='Upload media' labelPosition='right' icon='cloud upload' onClick={this.toggleModal}/>
        </Button.Group>
        <FileModal modal={this.state.modal} closeModal={this.toggleModal} uploadFile={this.uploadFile}/>
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