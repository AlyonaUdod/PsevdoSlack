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
    errors: [],
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

  isFormEmpty =({username, email, password, passwordConfirm}) => {
    return username && email && password && passwordConfirm
  }

  isPasswordValid = ({password, passwordConfirm}) => {
    return password === passwordConfirm
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
    } else if (!this.isPasswordValid(this.state)){
      error = {
        message: 'Password is invalid'
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
          <Form size='large' onSubmit={this.isFormValid}>
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
          {this.state.errors.length > 0 && (
            <Message error>
              <h3>Error</h3>
              {this.state.errors.map(el => <p key={el.message}>{el.message}</p>)}
            </Message>
          )}
            <Message>
              Already a user? 
              <NavLink to='/login'>&nbsp;Login</NavLink>
            </Message>
          </Grid.Column>
        </Grid>
    )
  }
}