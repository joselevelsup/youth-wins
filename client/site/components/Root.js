import React, { Component } from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import Landing from './Landing'
import Login from './Login'
import Signup from './Signup'
import Home from './Home'
import Support from './SupportUs';

class Root extends Component {
	componentDidMount(){
		this.props.user.loggedIn ? this.props.history.push('/home') : null
	}

	render(){
		return (
			<Switch>
				<Route exact path="/" component={Landing}/>
				<Route exact path="/login" component={Login}/>
				<Route exact path="/signup" component={Signup}/>
				<Route exact path="/home" component={Home}/>
				<Route exact path="/support" component={Support}/>
				<Route component={Landing}/>
			</Switch>
		)
	}
}

const mapStateToProps = state => state

const RootComponent = withRouter(connect(mapStateToProps)(Root))
export default RootComponent