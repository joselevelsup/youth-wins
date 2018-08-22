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
import { ResourceModal, StaffModal, UserModal } from "../../components/modal";
import { StaffItem, UserItem, ResourceItem } from "../../components/items";
import { shorten } from "../../util/helpers";
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
        this.createRes = this.createRes.bind(this);
        this.deleteRes = this.deleteRes.bind(this);
        this.updateRes = this.updateRes.bind(this);
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


    createRes(values, dispatch){
        const self = this;
        dispatch(createResource(values)).then(data => {
            self.createToggle();
        }).catch(err => {
            console.log(err);
        });
    }

    updateRes(values, dispatch){
        const self = this;
        dispatch(updateResource(this.state.resource._id, values)).then(data => {
            console.log(data);
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
                            <ResourceItem resource={r} deleteResource={this.deleteRes} openResource={this.showResource} admin={true} full={false}  />
                        ))
                    }
                    {
                        (approved && !this.state.view) &&
                        approved.map(r => (
                            <ResourceItem resource={r} deleteResource={this.deleteRes} openResource={this.showResource} admin={true} full={false} />
                        ))
                    }
                </Row>
                <Modal isOpen={this.state.createModal} toggle={this.createToggle}>
                    <ModalBody>
                        <main className="form-wrap">
                            <form onSubmit={handleSubmit(this.createRes)} className="support-form">
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
                <ResourceModal open={this.state.modal} toggle={() => this.setState({ modal: !this.state.modal})} resource={this.state.resource} admin={true} />
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
            createModal: false,
            staffModal: false,
            userModal: false,
            staff: null,
            user: null
        }

        this.createStaffMember = this.createStaffMember.bind(this);
        this.openStaffMember = this.openStaffMember.bind(this);
        this.deleteStaffMember = this.deleteStaffMember.bind(this);

        this.openApplicant = this.openApplicant.bind(this);
        this.deleteApplicant = this.deleteApplicant.bind(this);

        this.toggleUserModal = this.toggleUserModal.bind(this);
        this.toggleStaffModal = this.toggleStaffModal.bind(this);
    }



    componentDidMount(){
        this.props.dispatch(getAllUsers());
    }

    openStaffMember(staff){
        this.setState({
            staff: staff,
            staffModal: true
        });
    }

    openApplicant(user){
        this.setState({
            user: user,
            userModal: true
        });
    }

    toggleUserModal(){
        this.setState({
            userModal: !this.state.userModal
        });
    }

    toggleStaffModal(){
        this.setState({
            staffModal: !this.state.staffModal
        });
    }

    createStaffMember(values, dispatch){
        console.log(values);
    }

    deleteStaffMember(staffId){
        console.log(staffId);
    }

    deleteApplicant(userId){
        console.log(userId);
    }

    render(){
        const { users: { applicants, staff }, handleSubmit } = this.props;

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
                        (this.state.view && applicants) &&
                        applicants.map(a => (
                            <UserItem user={a} deleteUser={this.deleteApplicant} openUser={this.openApplicant} />
                        ))
                    }
                    {
                        (!this.state.view && staff) &&
                        staff.map(s => (
                            <StaffItem staff={s} openStaff={this.openStaffMember} deleteStaff={this.deleteStaffMember} />
                        ))
                    }
                    <StaffModal open={this.state.staffModal} toggle={this.toggleStaffModal} staff={this.state.staff} deleteStaff={this.deleteStaffMember} />
                    <UserModal open={this.state.userModal} toggle={this.toggleUserModal} user={this.state.user} deleteUser={this.deleteApplicant}  />
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
