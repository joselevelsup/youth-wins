import React, { Component } from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Container } from "reactstrap";
import Nav from "../components/nav";
import Landing from './Landing'
import Login from './Login'
import Signup from './Signup'
import Home from './Home'
import Resources from "./resources/resources";

class Root extends Component {
	  componentDidMount(){
		    this.props.user.loggedIn ? this.props.history.push('/home') : null
	  }

	  render(){
		    return (
            <Container fluid={true}>
                <Nav />
			          <Switch>
				            <Route exact path="/" component={Landing}/>
				            <Route exact path="/login" component={Login}/>
				            <Route exact path="/signup" component={Signup}/>
				            <Route exact path="/resources" component={Resources}/>
				            <Route component={Landing}/>
			          </Switch>
            </Container>
		    )
	  }
}

const mapStateToProps = state => state

const RootComponent = withRouter(connect(mapStateToProps)(Root))
export default RootComponent
