import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import UserPanel from '../UserPanel/UserPanel'
import Channels from '../Channels/Channels';
import DirectMessage from '../DirectMessage/DirectMessage';
import {connect} from 'react-redux'

class SidePanel extends Component {
  render() {
    return (
        <Menu
        size='large'
        inverted
        fixed='left'
        vertical
        style={{background:`${this.props.primaryColor}`, fontSize:'1.2rem'}}
        >
          <UserPanel/>
          <Channels/>
          <DirectMessage/>
        </Menu>
    )
  }
}

const MSTP = state => ({
  primaryColor: state.colors.primaryColor
})

export default connect(MSTP)(SidePanel)
