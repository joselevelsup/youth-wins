import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import Landing from './Landing'
import Login from './Login'
import Signup from './Signup'

export default class Root extends Component {
	render(){
		return (
			<Switch>
				<Route exact path="/" component={Landing}/>
				<Route exact path="/login" component={Login}/>
				<Route exact path="/signup" component={Signup}/>
			</Switch>
		)
	}
}