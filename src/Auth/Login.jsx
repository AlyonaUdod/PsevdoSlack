import React, { Component } from 'react'
import {Grid, Form, Segment, Button, Header, Message, Icon} from 'semantic-ui-react'
import {NavLink} from 'react-router-dom'
import firebase from '../firebase'

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

  handlerSubmit = (e) => {
    e.preventDefault()
    if (this.isFormValid()) {
      firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(signedInUser => {
        console.log(signedInUser) 
        })
      .catch(err => {
        console.error(err)
        this.setState({
          errors: this.state.errors.concat(err),
        })
      })
    } 
  }

  isFormEmpty =({email, password}) => {
    return email && password
  }

  isFormValid = () => {
    let errors = [];
    let error;
    if (!this.isFormEmpty(this.state)) {
      error = {
        message: 'Fill in all fields'
      };
      this.setState({
        errors: errors.concat(error)
      })
      console.log(false)
      return false
    } else {
      this.setState({
        errors: []
      })
      console.log(true)
      return true;
    }
  }

  handleInput = (errors, inputName) => {
    return errors.some(el => el.message.toLowerCase().includes(inputName)) ? 'error' : ''
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
            value={this.state.name}
            className={this.handleInput(this.state.errors, 'email')}
            />
          <Form.Input 
            fluid
            name='password'
            icon='lock'
            iconPosition='left'
            placeholder="Password"
            type='password'
            onChange={this.handlerChange}
            value={this.state.password}
            className={this.handleInput(this.state.errors, 'password')}
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
