import React from "react";
import { Row, Col } from "reactstrap";
import { NavLink, Link } from "react-router-dom";
import { connect } from "react-redux";
import "./nav.scss";

const MainNav = ({ user }) => (
    <div className="container-fluid header">
      <div className="row nav-content">
        <div className="offset-md-5 col-2 text-center align-self-center">
          <h3><Link to="/" className="link">Youth Wins</Link></h3>
        </div>
        {
            user &&
                user.loggedIn == false ?
                <React.Fragment>
                  <div className="offset-md-1 col align-self-center">
                    <NavLink to="/resources" className="link" activeClassName="active">Resources</NavLink>
                  </div>
                  <div className="col align-self-center">
                    <NavLink to="/about" className="link" activeClassName="active">About Us</NavLink>
                  </div>
                  <div className="col align-self-center">
                    <NavLink to="/support" className="link" activeClassName="active">Support Us</NavLink>
                  </div>
                </React.Fragment>
            :
            user.isStaff ?
            <div className="offset-4 col-1 align-self-center">
              <NavLink to="/login" className="link" activeClassName="active">Logout</NavLink>
            </div>
            :
            <React.Fragment>
              <div className="offset-md-2 col-1 align-self-center">
                <NavLink to="/dashboard" className="link" activeClassName="active">Dashboard</NavLink>
              </div>
              <div className="col-1 align-self-center">
                <NavLink to="/resources" className="link" activeClassName="active">Resources</NavLink>
              </div>
              <div className="col-1 align-self-center">
                <NavLink to="/login" className="link" activeClassName="active">Logout</NavLink>
              </div>
            </React.Fragment>
        }
        </div>
    </div>
)


export const MainNavBar = connect(state => ({
    user: state.user
}))(MainNav)
