import React from "react";
import {
    Container,
    Row,
    Col,
    Button,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Input
} from "reactstrap";
import Ionicon from "react-ionicons";
import { ResourceModal } from "../../components/modal";
import "./tabs.scss";

export class ResourcesTab extends React.Component{
    constructor(){
        super();
        this.state = {
            infoModal: false,
            editModal: false,
            view: true
        };
    }
    render(){
        return (
            <Container fluid={true} className="resourcesTab">
                <br />
                <Row>
                    <Col md={12} className="text-center">
                        <h3>Resources</h3>
                    </Col>
                </Row>
                <Row>
                    <Col md={{size: 4, offset: 4}}>
                        <InputGroup>
                            <Input placeholder="Search" />
                            <InputGroupAddon addonType="append">
                                <InputGroupText><Ionicon icon="ios-search" /></InputGroupText>
                            </InputGroupAddon>
                        </InputGroup>
                    </Col>
                    <Col md={{size: 2, offset: 2}}>
                        
                    </Col>
                </Row>
                <Row>
                    <Col md={6} className="text-center">
                        <button className={this.state.view ? "btn btn-primary btn-lg" : "btn btn-outline-primary btn-lg"} onClick={() => this.setState({ view: true })}> Pending</button>
                    </Col>
                    <Col md={6} className="text-center">
                        <button className={this.state.view ?  "btn btn-outline-primary btn-lg" : "btn btn-primary btn-lg" } onClick={() => this.setState({ view: false })}> Active</button>
                    </Col>
                </Row>
            </Container>
        )
    }
}


export const UsersTab = (props) => {
    return (
        <div>Users Tab</div>
    );
}
