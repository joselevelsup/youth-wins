import React, { Component } from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Container } from "reactstrap";
import { MainNavBar } from "../components/nav";
import Landing from './Landing'
import Login from './Login'
import Signup from './Signup'
import Home from './Home'
import Support from "./SupportUs";
import AboutUs from "./AboutUs";
import Dashboard from "./dashboard/dashboard";
import Resources from "./resources/resources";
import AdminPanel from "./admin/panel";
import Forgot from "./forgot";
import { CheckUser, CheckAdmin } from "../wrappers";
import "../style/app.scss";


class Root extends Component {


	  render(){
		    return (
            <React.Fragment>
              <MainNavBar push={this.props.history.push} />
              <Container fluid={true}>
			          <Switch>
				          <Route exact path="/" component={Home}/>
				          <Route exact path="/login" component={Login}/>
				          <Route exact path="/signup" component={Signup}/>
                  <Route exact path="/support" component={Support}/>
				          <Route exact path="/about" component={AboutUs}/>
                  <Route exact path="/dashboard" component={Dashboard}/>
				          <Route exact path="/resources" component={Resources}/>
                  <Route path="/forgot" component={Forgot} />
                  <Route exact path="/admin" component={CheckAdmin(AdminPanel)} />
				          <Route component={Landing}/>
			          </Switch>
              </Container>
            </React.Fragment>
		    )
	  }
}


const RootComponent = withRouter(connect()(Root))
export default RootComponent
