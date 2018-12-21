import React, { Component } from 'react'
import {Grid, Form, Segment, Button, Header, Message, Icon} from 'semantic-ui-react'
import {NavLink} from 'react-router-dom'

export default class Login extends Component {

  state = {
    email: '',
    password: '',
    errors: [],
  }

  handlerChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  isFormEmpty =({email, password}) => {
    return email && password
  }


  render() {
    return (
      <Grid textAlign='center' verticalAlign='middle' className='app'>
      <Grid.Column style={{
        maxWidth: 450
      }}>
      <Header as='h2' icon color='purple' textAlign='center'>
        <Icon name='user circle' color='purple'/>
        Login to PsevdoSlack
      </Header>
      <Form size='large' onSubmit={this.handlerSubmit}>
        <Segment stacked>
          <Form.Input 
            fluid
            name='email'
            icon='mail'
            iconPosition='left'
            placeholder="Email"
            type='email'
            onChange={this.handlerChange}
            />
          <Form.Input 
            fluid
            name='password'
            icon='lock'
            iconPosition='left'
            placeholder="Password"
            type='password'
            onChange={this.handlerChange}
            />
          <Button color='purple' fluid size='large'>
            Log In
          </Button>
        </Segment>
      </Form>
      {this.state.errors.length > 0 && (
        <Message error>
          <h3>Error</h3>
          {this.state.errors.map(el => <p key={el.message}>{el.message}</p>)}
        </Message>
      )}
        <Message>
          Don't have an account?
          <NavLink to='/registration'>&nbsp;Registration</NavLink>
        </Message>
      </Grid.Column>
    </Grid>
    )
  }
}
