import React, { Component } from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import Landing from '../pages/Landing'
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import Home from '../pages/Home'
import Support from '../pages/SupportUs';
import AboutUs from '../pages/AboutUs';

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
				<Route exact path="/about" component={AboutUs}/>
				<Route component={Landing}/>
			</Switch>
		)
	}
}

const mapStateToProps = state => state

const RootComponent = withRouter(connect(mapStateToProps)(Root))
export default RootComponent