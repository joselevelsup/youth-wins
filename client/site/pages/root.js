import React, { Component } from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Container } from "reactstrap";
import Nav from "../components/nav";
import Landing from './Landing'
import Login from './Login'
import Signup from './Signup'
import Home from './Home'
import Support from "./SupportUs";
import AboutUs from "./AboutUs";
import Resources from "./resources/resources";
import AdminPanel from "./admin/panel";
import "../style/app.scss";


class Root extends Component {
	  componentDidMount(){
		    this.props.user.loggedIn ? this.props.history.push('/home') : null
	  }

	  render(){
		    return (
            <React.Fragment>
                <Nav />
                <Container fluid={true}>
			              <Switch>
				                <Route exact path="/" component={Landing}/>
				                <Route exact path="/login" component={Login}/>
				                <Route exact path="/signup" component={Signup}/>
                        <Route exact path="/home" component={Home}/>
                        <Route exact path="/support" component={Support}/>
				                <Route exact path="/about" component={AboutUs}/>
				                <Route exact path="/resources" component={Resources}/>
                        <Route exact path="/admin" component={AdminPanel} />
				                <Route component={Landing}/>
			              </Switch>
                </Container>
            </React.Fragment>
		    )
	  }
}

const mapStateToProps = state => state

const RootComponent = withRouter(connect(mapStateToProps)(Root))
export default RootComponent
