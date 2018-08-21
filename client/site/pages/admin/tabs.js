import React from "react";
import { connect } from "react-redux";
import {
    Container,
    Row,
    Col,
    Button,
    Modal,
    ModalBody,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Input
} from "reactstrap";
import Ionicon from "react-ionicons";
import { Field, reduxForm } from "redux-form";
import {
    getAllResources,
    deleteResource,
    updateResource,
    createResource,
    getAllUsers
} from "../../actions/admin"
import { ResourceModal } from "../../components/modal";
import "./tabs.scss";

import deleteIcon from "../../assets/delete.png";

class ResourcesT extends React.Component{
    constructor(){
        super();
        this.state = {
            resource: null,
            createModal: false,
            modal: false,
            view: true
        };

        this.createToggle = this.createToggle.bind(this);
        this.showResource = this.showResource.bind(this);
        this.createResource = this.createResource.bind(this);
        this.deleteRes = this.deleteRes.bind(this);
    }

    componentDidMount(){
        this.props.dispatch(getAllResources());
    }

    showResource(r){
        this.setState({
            resource: r,
            modal: true
        });
    }


    createResource(values, dispatch){
        const self = this;
        dispatch(createResource(values)).then(data => {
            self.createToggle();
        }).catch(err => {
            console.log(err);
        });
    }


    deleteRes(id){
        this.props.dispatch(deleteResource(id)).then(data => {
            console.log(data);
        }).catch(err => {
            console.log(err);
        })
    }

    createToggle(){
        this.setState({
            createModal: !this.state.createModal
        });
    }


    render(){
        const { resources: { pending, approved }, handleSubmit } = this.props;
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
                        <Button color="primary" onClick={this.createToggle}> Create Resource</Button>
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
                    <br />
                </Row>
                <Row>
                    {
                        (pending && this.state.view) &&
                        pending.map(r => (
                            <Col md={6} className="resourceItem" >
                                <div className="media">
                                    <img className="align-self-center mr-3 rounded-circle" onClick={() => this.showResource(r)} width="128" height="128" src={r.logo} />
                                    <div className="media-body">
                                        <h5 className="mt-0">{r.organizationName}</h5>
                                        <div className="row">
                                            <div className="col-10">
                                                <p>{r.description}</p>
                                            </div>
                                            <div className="col-2">
                                                <Button color="clear" onClick={() => this.deleteRes(r._id)}><img src={deleteIcon} width="60" height="60" /></Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        ))
                    }
                    {
                        (approved && !this.state.view) &&
                        approved.map(r => (
                            <Col md={6} className="resourceItem">
                                <div className="media">
                                    <img className="align-self-center mr-3 rounded-circle" onClick={() => this.showResource(r)} width="128" height="128" src={r.logo} />
                                    <div className="media-body">
                                        <h5 className="mt-0">{r.organizationName}</h5>
                                        <div className="row">
                                            <div className="col-10">
                                                <p>{r.description}</p>
                                            </div>
                                            <div className="col-2">
                                                <Button color="clear" onClick={() => this.deleteResource(r._id)}><img src={deleteIcon} width="60" height="60" /></Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        ))
                    }
                </Row>
                <Modal isOpen={this.state.createModal} toggle={this.createToggle}>
                    <ModalBody>
                        <main className="form-wrap">
                            <form onSubmit={handleSubmit(this.createResource)} className="support-form">
					                      <div className="form-group support-form-items">
						                        <label>Name</label>
						                        <Field name="name" className="form-control" component="input" type="text" />
					                      </div>
                                <div className="form-group support-form-items">
						                        <label>Website</label>
						                        <Field name="website" className="form-control" component="input" type="text" />
					                      </div>
                                <div className="form-group support-form-items">
						                        <label>Contact Email</label>
						                        <Field name="contactEmail" className="form-control" component="input" type="text" />
					                      </div>
                                <div className="form-group support-form-items">
						                        <label>Description</label>
						                        <Field name="description" className="form-control" component="input" type="text" />
					                      </div>
					                      {/* <FormGroup className="support-form-items">
						                        <Label>Logo</Label><br/>
						                        <div className="tallInput resourceUploadImage">
							                      <Button className="uploadButton" color="warning" onClick={this.fileUpload}>+</Button>
						                        </div>						
						                        <input ref={e => this.uploader = e} className="fileHidden" name="logo" type="file"/>
					                          </FormGroup> */}
					                      <Button color="warning" type="submit">submit</Button>
                            </form>
                        </main>
                    </ModalBody>
                </Modal>
                <ResourceModal open={this.state.modal} toggle={() => this.setState({ modal: !this.state.modal})} resource={this.state.resource} />
            </Container>
        )
    }
}

const ResourcesForm = reduxForm({
    form: "resource"
})(ResourcesT);

export const ResourcesTab = connect((state) => {
    return {
        resources: state.adminResources
    }
})(ResourcesForm);


class UsersT extends React.Component{
    constructor(){
        super();
        this.state = {
            view: true,
            createModal: false
        }
    }

    componentDidMount(){
        this.props.dispatch(getAllUsers());
    }


    render(){
        console.log(this.props);
        return (
            <Container fluid={true} className="usersTab">
                <br />
                <Row>
                    <Col md={12} className="text-center">
                        <h3>Users</h3>
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
                    {
                        !this.state.view &&
                        <Col md={{size: 2, offset: 2}}>
                            <Button color="primary" onClick={this.createToggle}> New Staff Member</Button>
                        </Col>
                    }
                </Row>
                <Row>
                    <br />
                </Row>
                <Row>
                    <Col md={6} className="text-center">
                        <button className={this.state.view ? "btn btn-primary btn-lg w-50" : "btn btn-outline-primary btn-lg w-50"} onClick={() => this.setState({ view: true })}> Applicants</button>
                    </Col>
                    <Col md={6} className="text-center">
                        <button className={this.state.view ?  "btn btn-outline-primary btn-lg w-50" : "btn btn-primary btn-lg w-50" } onClick={() => this.setState({ view: false })}> Staff</button>
                    </Col>
                </Row>
                <Row>
                    <br />
                </Row>
                <Row>
                    {
                        
                    }
                </Row>
            </Container>
        )
    }
}

const UsersForm = reduxForm({
    form: "user"
})(UsersT);


export const UsersTab = connect((state) => {
    return {
        users: state.adminUsers
    }
})(UsersForm);
