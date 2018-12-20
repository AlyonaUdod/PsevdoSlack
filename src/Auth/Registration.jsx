import React, { Component } from 'react'
import firebase from '../firebase';
import {NavLink} from 'react-router-dom'
import {Grid, Form, Segment, Button, Header, Message, Icon} from 'semantic-ui-react'

export default class Registration extends Component {

  state = {
    username: '',
    email: '',
    password: '',
    passwordConfirm: '',
  }

  handlerChange = (e) => {
    let value = e.target.value;
    let name = e.target.name;
    this.setState({
      [name]: value,
    })
  }

  handlerSubmit = (e) => {
    e.preventDefault()
    firebase
    .auth()
    .createUserWithEmailAndPassword(this.state.email, this.state.password)
    .then(createUser => {
      console.log(createUser)
    })
    .catch(err => {
      console.error(err)
    })
  }

  render() {
    return (
        <Grid textAlign='center' verticalAlign='middle' className='app'>
          <Grid.Column style={{
            maxWidth: 450
          }}>
          <Header as='h2' icon color='purple' textAlign='center'>
            <Icon name='comment alternate' color='purple'/>
            Register for VsevdoSlack
          </Header>
          <Form size='large' onSubmit={this.handlerSubmit}>
            <Segment stacked>
              <Form.Input 
                fluid
                name='username'
                icon='user'
                iconPosition='left'
                placeholder="Username"
                type='text'
                onChange={this.handlerChange}
                value={this.state.name}/>
              <Form.Input 
                fluid
                name='email'
                icon='mail'
                iconPosition='left'
                placeholder="Email"
                type='email'
                onChange={this.handlerChange}
                value={this.state.email}/>
              <Form.Input 
                fluid
                name='password'
                icon='lock'
                iconPosition='left'
                placeholder="Password"
                type='password'
                onChange={this.handlerChange}
                value={this.state.password}/>
              <Form.Input 
                fluid
                name='passwordConfirm'
                icon='repeat'
                iconPosition='left'
                placeholder="Password Confirm"
                type='password'
                onChange={this.handlerChange}
                value={this.state.passwordConfirm}/> 
              <Button color='purple' fluid size='large'>
                Submit
              </Button>
            </Segment>
          </Form>
            <Message>
              Already a user? 
              <NavLink to='/login'>&nbsp;Login</NavLink>
            </Message>
          </Grid.Column>
        </Grid>
    )
  }
}