import React, { Component } from 'react'
import { Sidebar, Divider, Button, Menu } from 'semantic-ui-react';

export default class ColorPanel extends Component {
  render() {
    return (
      <Sidebar
        as={Menu}
        icon='labeled'
        inverted
        visible
        vertical
        width='very thin'>
        <Divider/>
          <Button icon='add' size='small' color='blue'/>
      </Sidebar>
    )
  }
}
