import React from "react";
import { Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import "./nav.scss";

export default () => (
    <Row className="header">
        <Col md={{size: 4}}>
            <h2>Youth Wins</h2>
        </Col>
        <Col md={{size: 3}}>
            <h3>Dashboard</h3>
        </Col>
        <Col md={{size: 3}}>
            <h3>Resources</h3>
        </Col>
        <Col md={{size: 3}}>
            <h3>Logout</h3>
        </Col>
    </Row>
)
