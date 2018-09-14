import React from "react";
import { Row, Col } from "reactstrap";
import { NavLink, Link } from "react-router-dom";
import { connect } from "react-redux";
import { logOutUser } from "../actions/auth";
import "./nav.scss";


class MainNav extends React.Component {
    constructor(){
        super();

        this.logOut = this.logOut.bind(this);
    }

    logOut(){
        this.props.dispatch(logOutUser()).then(data => {
            this.props.push("/");
        }).catch(err => {
            console.log(err);
        });
    }

    render(){
		const { user } = this.props;
        return (
            <nav className="navbar navbar-expand-lg bg-youth">
              <div className="navbar-collapse collapse"></div>
              <Link to={user && user.loggedIn ? "/dashboard" :  "/"} className="navbar-brand text-center mx-auto"><h3>Youth Wins</h3></Link>
              <div className="navbar-collapse collapse">
                <ul className="nav navbar-nav ml-auto">
                  {
                      user &&
                          user.loggedIn == false ?
                          <React.Fragment>
                            <li className="nav-item text-center">
                              <NavLink to="/resources" activeClassName="active">Resources</NavLink>
                            </li>
                            <li className="nav-item text-center">
                              <NavLink to="/about" activeClassName="active">About Us</NavLink>
                            </li>
                            <li className="nav-item text-center">
                              <NavLink to="/support" activeClassName="active">Support Us</NavLink>
                            </li>
                          </React.Fragment>
                          :
                          user.isStaff ?
                          <li className="nav-item text-center">
                            <a onClick={this.logOut} className="link">Logout</a>
                          </li>
                          :
                          <React.Fragment>
                            <li className="nav-item text-center">
                              <NavLink to="/dashboard" activeClassName="active">Dashboard</NavLink>
                            </li>
                            <li className="nav-item text-center">
                              <NavLink to="/resources" activeClassName="active">Resources</NavLink>
                            </li>
                            <li className="nav-item text-center">
                              <a onClick={this.logOut} className="link">Logout</a>
                            </li>
                          </React.Fragment>
                  } 
                </ul>
              </div>
            </nav>
        )
    }
}

export const MainNavBar = connect(state => ({
    user: state.user
}))(MainNav)



