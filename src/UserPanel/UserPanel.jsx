import React, { Component } from 'react'
import { Grid, Header, Icon, Dropdown, Image } from 'semantic-ui-react';
import firebase from '../firebase'
import {connect} from 'react-redux'


class UserPanel extends Component {

    dropdownOptions = () => [
        {
            key: 'user',
            text: <span> <Icon name='smile'/> Sign in as <strong>User</strong></span>,
            disabled: true,
        },
        {
            key: 'avatar',
            text: <span><Icon name='picture'/> Change Avatar</span>
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
                </Grid.Row>
                <Header style={{padding:'0.25rem'}} as='h4' inverted>
                    <Dropdown trigger={   
                        <span style={{marginLeft: '1.1rem'}}> 
                        <Image src={this.props.user.currentUser.photoURL} spased='right' style={{boxSizing:'border-box', marginRight: '.7rem'}} avatar/>
                        {this.props.user.currentUser.displayName}</span>
                    } options={this.dropdownOptions()}/>
                </Header>
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