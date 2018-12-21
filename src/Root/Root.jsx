import React, { Component } from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'
import App from '../App.js'
import Login from '../Auth/Login'
import Registration from '../Auth/Registration'
import firebase from '../firebase'


 class Root extends Component {

  componentDidMount(){
    firebase.auth().onAuthStateChanged(user => {
      if(user) {
        console.log(user);
        this.props.history.push('/')
      }
    })
  }

  render() {
    return (
      <div>
        <Switch>
          <Route exact path='/' component={App}/>
          <Route path='/login' component={Login}/>
          <Route path='/registration' component={Registration}/>
        </Switch>
      </div>
    )
  }
}

export default withRouter(Root)

// withRouter - HOC, принимает аргуементом компонент и дает доступ к истории браузера этого объекта.