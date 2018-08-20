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
        const { pending, approved } = this.props;
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
                    <br />
                </Row>
                <Row>
                    <Col md={6} className="text-center">
                        <button className={this.state.view ? "btn btn-primary btn-lg w-50" : "btn btn-outline-primary btn-lg w-50"} onClick={() => this.setState({ view: true })}> Pending</button>
                    </Col>
                    <Col md={6} className="text-center">
                        <button className={this.state.view ?  "btn btn-outline-primary btn-lg w-50" : "btn btn-primary btn-lg w-50" } onClick={() => this.setState({ view: false })}> Active</button>
                    </Col>
                </Row>

                <Row>
                    {
                        (pending && this.state.view) &&
                        pending.map(r => (
                            <Col md={6}>
                                <div className="media">
                                    <img className="align-self-center mr-3 rounded-circle" width="128" height="128" src={r.logo} />
                                    <div className="media-body">
                                        <h5 className="mt-0">{r.organizationName}</h5>
                                        <div className="row">
                                            <div className="col-10">
                                                <p>{r.description}</p>
                                            </div>
                                            <div className="col-2">
                                                
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        ))
                    }
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
