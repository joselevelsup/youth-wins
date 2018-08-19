import React from "react";
import { Row, Col } from "reactstrap";
import { NavLink, Link } from "react-router-dom";
import "./nav.scss";

export default () => (
    <div className="container-fluid header">
        <div className="row nav-content">
            <div className="offset-md-5 col-2 text-center align-self-center">
                <h3><Link to="/" className="link">Youth Wins</Link></h3>
            </div>
            <div className="offset-md-2 col-1 align-self-center">
                <NavLink to="/dashboard" className="link" activeClassName="active">Dashboard</NavLink>
            </div>
            <div className="col-1 align-self-center">
                <NavLink to="/resources" className="link" activeClassName="active">Resources</NavLink>
            </div>
            <div className="col-1 align-self-center">
                <NavLink to="/login" className="link" activeClassName="active">Login</NavLink>
            </div>
        </div>
    </div>
)
