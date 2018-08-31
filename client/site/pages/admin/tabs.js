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
    approve,
    deny,
    getAllUsers,
    deleteStaff,
    updateStaff,
    createStaff
} from "../../actions/admin"
import { ResourceModal, StaffModal, CreateResource,  UserModal, EditResource, CreateStaff } from "../../components/modal";
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
            editModal: false,
            view: true
        };


        this.loadResources = this.loadResources.bind(this);
        this.createToggle = this.createToggle.bind(this);
        this.showResource = this.showResource.bind(this);
        this.createRes = this.createRes.bind(this);
        this.deleteRes = this.deleteRes.bind(this);
        this.updateRes = this.updateRes.bind(this);
        this.approveRes = this.approveRes.bind(this);
        this.denyRes = this.denyRes.bind(this);
    }

    loadResources(){
        this.props.dispatch(getAllResources());
    }

    componentDidMount(){
        this.loadResources();
    }

    showResource(r){
        this.setState({
            resource: r,
            modal: true
        });
    }

    approveRes(id){
        const self = this;
        this.props.dispatch(approve(id)).then(data => {
            self.setState({
                modal: false
            });
            self.loadResources();
        }).catch(err => {
            console.log(err);
        });
    }

    denyRes(id){
        const self = this;
        this.props.dispatch(deny(id)).then(data => {
            self.setState({
                modal: false
            });
            self.loadResources();
        }).catch(err => {
            console.log(err);
        });
    }

    createRes(values, dispatch){
        const self = this;
        dispatch(createResource(values)).then(data => {
            self.createToggle();
            self.loadResources();
        }).catch(err => {
            console.log(err);
        });
    }

    updateRes(values, dispatch){
        const self = this;
        dispatch(updateResource(this.state.resource._id, values)).then(data => {
            self.loadResources();
        }).catch(err => {
            console.log(err);
        });
    }


    deleteRes(id){
        const self = this;
        this.props.dispatch(deleteResource(id)).then(data => {
            self.loadResources();
        }).catch(err => {
            console.log(err);
        });
    }

    createToggle(){
        this.setState({
            createModal: !this.state.createModal
        });
    }

    editToggle(){
        this.setState({
            editModal: !this.state.editModal,
            modal: !this.state.modal
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
              <CreateResource open={this.state.createModal} toggle={() => this.setState({ creareModal: !this.state.createModal})} create={handleSubmit(this.createRes)}/>
              <ResourceModal open={this.state.modal} edit={() => this.editToggle()} toggle={() => this.setState({resource: null, modal: !this.state.modal})} remove={() => this.deleteRes(this.state.resource._id)} resource={this.state.resource} admin={true} approve={() => this.approveRes(this.state.resource._id)} deny={() => this.denyRes(this.state.resource._id)} />
              <EditResource open={this.state.editModal} toggle={() => this.setState({ resource:null, editModal: !this.state.editModal})} resource={this.state.resource} />
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
        this.toggleCreateModal = this.toggleCreateModal.bind(this);
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

    toggleCreateModal(){
        this.setState({
            createModal: !this.state.createModal
        });
    }

    createStaffMember(values, dispatch){
        // console.log(values);
        dispatch(createStaff(values)).then(data => {
            console.log(data);
        }).catch(err => {
            console.log(err);
        });
    }

    deleteStaffMember(staffId){
        this.props.dispatch(deleteStaff(staffId)).then(data => {
            console.log(data);
        }).catch(err => {
            console.log(err);
        });
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
                            <Button color="primary" onClick={this.toggleCreateModal}> New Staff Member</Button>
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
                </Row>
              <StaffModal open={this.state.staffModal} toggle={this.toggleStaffModal} staff={this.state.staff} deleteStaff={this.deleteStaffMember} />
              <UserModal open={this.state.userModal} toggle={this.toggleUserModal} user={this.state.user} deleteUser={this.deleteApplicant}  />
              <CreateStaff open={this.state.createModal} toggle={this.toggleCreateModal} create={handleSubmit(this.createStaffMember)} />
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
