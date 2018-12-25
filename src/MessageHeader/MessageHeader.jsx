import React, { Component } from 'react'
import { Segment, Header, Icon, Input } from 'semantic-ui-react';
import {connect} from 'react-redux'

class MessageHeader extends Component {


  render() {

    // console.log(this.props.channel)

    return (
      <Segment clearing>
        <Header 
        fluid='true'
        as='h2'
        floated='left'
        style={{
            marginBottom: 0
        }}>
        <span>
           {this.props.channel === null ? 'Channel' : this.props.channel.name}&nbsp;
            <Icon name ='star outline' color='black'/>
        </span>
        <Header.Subheader>
         {this.props.countUser}
        </Header.Subheader>
        </Header>
        <Header floated='right'>
        <Input size='mini' icon='search' name='SeachTerm' placeholder='Search'/>

        </Header>
      </Segment>
    )
  }
}

function MSTP (state) {
  return {
    // user: state.user.currentUser,
    channel: state.channel
  }
}


export default connect(MSTP) (MessageHeader) 