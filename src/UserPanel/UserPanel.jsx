import React, { Component } from 'react'
import { Grid, Header, Icon, Dropdown, Image, Modal, Input, Button } from 'semantic-ui-react';
import firebase from '../firebase'
import {connect} from 'react-redux'
import AvatarEditor from 'react-avatar-editor'


class UserPanel extends Component {

    state = {
        modal: false,
        previewImage: '',
        croppedImage: '',
        blob: '',
        uploadedCroppedImage: "",
        storageRef: firebase.storage().ref(),
        userRef: firebase.auth().currentUser,
        usersRef: firebase.database().ref("users"),
        metadata: {
          contentType: "image/jpeg"
        }
    }

    dropdownOptions = () => [
        {
            key: 'user',
            text: <span> <Icon name='smile'/> Sign in as <strong>User</strong></span>,
            disabled: true,
        },
        {
            key: 'avatar',
            text: <span onClick={this.toggleModal}><Icon name='picture'/> Change Avatar</span>
        },
        {
            key: 'out',
            text: <span onClick={this.signOut}><Icon name='sign-out alternate'/> Sign Out</span>,
        }
    ]

    signOut = () => {
        firebase
        .auth()
        .signOut()
        .then(() => {
            console.log('sign out')
        })
    }

    toggleModal = () => this.setState(prev=>({modal: !prev.modal}))

    handleChange = event => {
        const file = event.target.files[0];
        const reader = new FileReader();

        if (file) {
            reader.readAsDataURL(file);
            reader.addEventListener('load', () => {
                this.setState({ previewImage: reader.result})
            })
        }
    }

    handleCroppImage = () => {
        if (this.avatarEditor) {
            this.avatarEditor.getImageScaledToCanvas().toBlob( blob => {
                let imageUrl = URL.createObjectURL(blob);
                this.setState({
                    croppedImage: imageUrl,
                    blob
                })
            })
        }
    }

    uploadCroppedImage = () => {
        const { storageRef, userRef, blob, metadata} = this.state

        storageRef
        .child(`avatars/user-${userRef.uid}`)
        .put(blob,metadata)
        .then(snap => {
            snap.ref.getDownloadURL().then(downloadUrl => {
                this.setState({ uploadedCroppedImage: downloadUrl}, () => 
                this.changeAvatar())
            })
        })
    }

    changeAvatar = () => {
        this.state.userRef
        .updateProfile({
            photoURL: this.state.uploadedCroppedImage
        })
        .then(() => {
            console.log('PhotoURL update');
            this.toggleModal()
        })
        .catch(err => {
            console.error(err)
        });

        this.state.usersRef
        .child(this.props.user.currentUser.uid)
        .update({ avatar: this.state.uploadedCroppedImage})
        .then(() => {
            console.log('User Avatar update')
        })
        .catch(err => {
            console.error(err);
        })


    }
    

  render() {
    console.log(this.props.user)
    return (
        <Grid style={{
            background: `${this.props.primaryColor}`
        }}>
            <Grid.Column>
                <Grid.Row
                style={{
                    padding: '1.2rem',
                    margin: '0'
                }}>
                <Header inverted floated='left' as='h2'>
                    <Icon name='cloud'/>
                    <Header.Content>PsevdoSlack</Header.Content>
                </Header>
                    <Header style={{padding:'0.25rem'}} as='h4' inverted>
                        <Dropdown trigger={   
                            <span> 
                            <Image src={this.props.user.currentUser.photoURL} spased='right' style={{boxSizing:'border-box', marginRight: '.7rem'}} avatar/>
                            {this.props.user.currentUser.displayName}</span>
                        } options={this.dropdownOptions()}/>
                    </Header>
                </Grid.Row>

                <Modal open={this.state.modal} onClose={this.toggleModal}>
                    <Modal.Header>Change Avatar</Modal.Header>
                    <Modal.Content>
                    <Input fluid type="file" label="New Avatar" name="previewImage" onChange={this.handleChange}/>
                    <Grid centered stackable columns={2}>
                        <Grid.Row centered>
                        <Grid.Column className="ui center aligned grid">
                            {/* Image Preview */}
                            {this.state.previewImage && (
                            <AvatarEditor
                                ref={node => (this.avatarEditor = node)} // атрибут каждого еракт компонента. получаем доступ к реальному дом дереву
                                image={this.state.previewImage}
                                width={120}
                                height={120}
                                border={50}
                                scale={1.2}
                            />
                            )}
                        </Grid.Column>
                        <Grid.Column>{/* Cropped Image Preview */}
                            {this.state.croppedImage && (
                            <Image
                                style={{ margin: '3.5em auto' }}
                                width={100}
                                height={100}
                                src={this.state.croppedImage}
                            />
                            )}
                        </Grid.Column>
                        </Grid.Row>
                    </Grid>
                    </Modal.Content>
                    <Modal.Actions>
                    <Button color="green" inverted onClick={this.uploadCroppedImage}>
                        <Icon name="save" /> Change Avatar
                    </Button>
                    <Button color="green" inverted onClick={this.handleCroppImage}>
                        <Icon name="image" /> Preview
                    </Button>
                    <Button color="red" inverted onClick={this.toggleModal}>
                        <Icon name="remove" /> Cancel
                    </Button>
                    </Modal.Actions>
                </Modal>

            </Grid.Column>
            
        </Grid>
    )
  }
}

function MSTP (state) {
    return {
      user: state.user,
      primaryColor: state.colors.primaryColor
    }
  }

  export default connect(MSTP, null)(UserPanel)