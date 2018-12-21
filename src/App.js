import React, { Component } from 'react';
import './App.css';
import ColorPanel from './ColorPanel/ColorPanel'
import SidePanel from './SidePanel/SidePanel'
import Message from './Message/Message'
import MetaPanel from './MetaPanel/MetaPanel'
import { Grid } from 'semantic-ui-react';


class App extends Component {
  render() {
    return (
      <Grid columns='equal' className="app">
          <ColorPanel/>
          <SidePanel/>
        <Grid.Column textAlign='center'>
          <Message/>
        </Grid.Column>
        <Grid.Column width={4}>
          <MetaPanel/>
        </Grid.Column>
      </Grid>
    );
  }
}

export default App;
