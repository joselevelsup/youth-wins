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
    Input,
    Alert
} from "reactstrap";
import Ionicon from "react-ionicons";
import { Field, reduxForm, getFormValues } from "redux-form";
import { getCurrentUser } from "../../actions/auth";
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
    updateStaffMember,
    createStaff,
    deleteUser,
    getAllApplications,
    deleteApp,
    getContent,
    updateHomeContent,
    updateSupportContent,
    updateAboutContent,
    addMember,
    createNewCategory,
    deleteACategory
} from "../../actions/admin";

import { toggleResponse } from "../../actions/dashboard";
import {
    ResourceModal,
    StaffModal,
    CreateResource,
    UserModal,
    EditResource,
    CreateStaff,
    EditStaff,
    DeleteUserModal
} from "../../components/modal";
import { StaffItem, UserItem, ResourceItem, AppItem, TeamItem } from "../../components/items";
import { HomeCms } from "./homecms";
import { AboutCms } from "./aboutcms";
import { SupportCms } from "./supportcms";
import DropzoneInput from "../../components/dropzone";
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
        this.props.dispatch(getContent());
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
			self.editToggle();
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
        this.loadResources();
        this.setState({
            createModal: !this.state.createModal
        });
    }

    editToggle(){
        this.loadResources();
        this.setState({
            editModal: !this.state.editModal,
            modal: false
		});
    }


    render(){
        const { resources: { pending, approved }, handleSubmit, formValues } = this.props;
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
              {this.state.createModal && <CreateResource open={this.state.createModal} toggle={() => this.setState({ createModal: !this.state.createModal})} create={handleSubmit(this.createRes)} reset={this.props.destroy} createValues={formValues}/>}
              <ResourceModal open={this.state.modal} edit={() => this.editToggle()} toggle={() => this.setState({resource: null, modal: !this.state.modal})} remove={() => this.deleteRes(this.state.resource._id)} resource={this.state.resource} admin={true} approve={() => this.approveRes(this.state.resource._id)} deny={() => this.denyRes(this.state.resource._id)} />
              {this.state.editModal && <EditResource init={this.props.initialize} open={this.state.editModal} toggle={() => this.setState({ editModal: !this.state.editModal})} updateRes={handleSubmit(this.updateRes)} reset={this.props.destroy} resource={this.state.resource} />}
            </Container>
        )
    }
}

const ResourcesForm = reduxForm({
    form: "resource",
})(ResourcesT);

export const ResourcesTab = connect((state) => {
    return {
        resources: state.adminResources,
        formValues: getFormValues("resource")(state)
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
            user: null,
            editStaffModal: false,
            userPrompt: false,
            userType: false
        };

        this.createStaffMember = this.createStaffMember.bind(this);
        this.openStaffMember = this.openStaffMember.bind(this);
        this.deleteStaffMember = this.deleteStaffMember.bind(this);

        this.openApplicant = this.openApplicant.bind(this);
        this.deleteApplicant = this.deleteApplicant.bind(this);

        this.toggleUserModal = this.toggleUserModal.bind(this);
        this.toggleStaffModal = this.toggleStaffModal.bind(this);
        this.toggleCreateModal = this.toggleCreateModal.bind(this);
        this.toggleEditStaff = this.toggleEditStaff.bind(this);
        this.editStaffMember = this.editStaffMember.bind(this);
        this.getUsers = this.getUsers.bind(this);

        this.offModals = this.offModals.bind(this);
    }


    getUsers(){
        this.props.dispatch(getAllUsers());
    }

    compoenntDidMount(){
        this.getUsers();
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

    toggleEditStaff(staff){
        this.setState({
            staff: staff,
            editStaffModal: !this.state.editStaffModal
        });
    }


    deleteUserPrompt(id, type){
        this.setState({
            userType: type,
            userPrompt: !this.state.userPrompt,
            user: id
        });
    }

    offModals(){
        this.setState({
            staffModal: false,
            createModal: false,
            userModal: false,
            userPrompt: false,
            editStaffModal: false
        });
    }

    createStaffMember(values, dispatch){
        const self = this;
        dispatch(createStaff(values)).then(data => {
            self.toggleCreateModal();
            self.getUsers();
        }).catch(err => {
            console.log(err);
        });
    }

    deleteStaffMember(staffId){
        this.props.dispatch(deleteStaff(staffId)).then(data => {
            this.offModals();
            this.getUsers();
        }).catch(err => {
            console.log(err);
        });
    }

    deleteApplicant(userId){
        this.props.dispatch(deleteUser(userId)).then(data => {
            this.offModals();
            this.getUsers();
        }).catch(err => {
            console.log(err);
        });
    }


    editStaffMember(values, dispatch){
        const self = this;
        dispatch(updateStaffMember(values)).then(data => {
            self.getUsers();
            self.offModals();
        }).catch(err => {
            console.log(err);
        });
    }

    // editApplicant(values, dispatch){
    //     dispatch(updateApplicant(values)).then(data => {
    //         console.log(data);
    //     }).catch(err => {
    //         console.log(err);
    //     });
    // }

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
                            <UserItem user={a} deleteUser={() => this.deleteUserPrompt(a._id, true)} openUser={this.openApplicant} />
                        ))
                    }
                    {
                        (!this.state.view && staff) &&
                        staff.map(s => (
                            <StaffItem staff={s} openStaff={this.openStaffMember} deleteStaff={() => this.deleteUserPrompt(s._id, false)} />
                        ))
                    }
                </Row>
              <StaffModal open={this.state.staffModal} toggle={this.toggleStaffModal} staff={this.state.staff} deleteStaff={this.deleteStaffMember} editStaff={() => this.toggleEditStaff(this.state.staff)} />
              {this.state.userModal && <UserModal open={this.state.userModal} toggle={this.toggleUserModal} user={this.state.user} deleteUser={this.deleteApplicant}  />}
              {this.state.createModal && <CreateStaff open={this.state.createModal} toggle={this.toggleCreateModal} create={handleSubmit(this.createStaffMember)} reset={this.props.destroy} />}
              {this.state.userPrompt && <DeleteUserModal open={this.state.userPrompt} toggle={this.offModals} deleteUser={this.state.userType ? () => this.deleteApplicant(this.state.user) : () => this.deleteStaffMember(this.state.user)}/>}
              {this.state.editStaffModal && <EditStaff edit={this.editStaffMember} open={this.state.editStaffModal} toggle={this.toggleEditStaff} user={this.state.staff}/>}
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


class AppsT extends React.Component {
    constructor(){
        super();

        this.state = {
            resource: null,
            status: null,
            resourceModal: false
        };

        this.loadApps = this.loadApps.bind(this);
        this.openResource = this.openResource.bind(this);
        this.toggleResource = this.toggleResource.bind(this);
        this.deleteApplication = this.deleteApplication.bind(this);
        this.toggleResponse = this.toggleResponse.bind(this);

    }

    loadApps(){
        this.props.dispatch(getAllApplications());
    }

    componentDidMount(){
        this.loadApps();
    }

    toggleResource(){
        this.setState({
            resourceModal: !this.state.resourceModal
        });
    }

    openResource(r, status, appId, user, created){
        this.setState({
            resource: r,
            appId: appId,
            user: user,
            status: status,
            created: created,
            resourceModal: true
        });
    }

    toggleResponse(status){
        this.props.dispatch(toggleResponse(status, this.state.appId));
        this.loadApps();
    }

    deleteApplication(appId){
        const self = this;
        this.props.dispatch(deleteApp(appId)).then(data => {
            self.loadApps();
        }).catch(err => {
            console.log(err);
        });
    }

    render(){
        const { apps } = this.props;
        return (
            <Container fluid={true}>
              <br />
              <Row>
                <Col md={12} className="text-center">
                  <h3>Applications</h3>
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
              </Row>
              <Row>
                <br />
              </Row>
              <Row>
                {
                    apps &&
                       apps.applications && apps.applications.map(a => (
                           <AppItem size={4} created={a.dateCreated} appId={a._id} deleteApp={this.deleteApplication} resource={a.resource} openResource={this.openResource} user={a.user} status={a.status}/>
                        ))
                }
              </Row>
              {this.state.resource && <ResourceModal open={this.state.resourceModal} resource={this.state.resource} toggle={this.toggleResource} status={this.state.status} user={this.state.user} created={this.state.created} toggleResponse={this.toggleResponse} />}
            </Container>
        );
    }
}

export const ApplicationsTab = connect(state => ({
    apps: state.adminApps
}))(AppsT)


class SettingsT extends React.Component{
    constructor(){
        super();

        this.state = {
            view: 1,
            createModal: false,
            editStaffModal: false,
            homeUpdate: false,
            supportUpdate: false,
            aboutUpdate: false
        };

        this.loadContent = this.loadContent.bind(this);
        this.updateHome = this.updateHome.bind(this);
        this.updateSupport = this.updateSupport.bind(this);
        this.updateAbout = this.updateAbout.bind(this);
        this.addToSite = this.addToSite.bind(this);
        this.toggleCategoryModal = this.toggleCategoryModal.bind(this);
        this.toggleCreateModal = this.toggleCreateModal.bind(this);
        this.toggleEditStaff = this.toggleEditStaff.bind(this);
        this.createCategory = this.createCategory.bind(this);
        this.deleteCategory = this.deleteCategory.bind(this);
        this.createStaffMember = this.createStaffMember.bind(this);
        this.editStaffMember = this.editStaffMember.bind(this);
    }

    loadContent(){
        this.props.dispatch(getContent());
        this.props.dispatch(getAllUsers());
    }

    componentDidMount(){
        this.loadContent();
    }

    toggleEditStaff(){
        this.setState({
            staffModal: false,
            editStaffModal: !this.state.editStaffModal
        });
    }

    editStaffMember(values, dispatch){
        dispatch(updateStaff(values)).then(data => {
            if(data.success){
                this.props.dispatch(getCurrentUser());
                this.toggleEditStaff();
                this.loadContent();
            }
        }).catch(err => {
            console.log(err);
        });
    }

    updateHome(values, dispatch){
        dispatch(updateHomeContent(values)).then(data => {
            if(data.success){
                this.setState({
                    homeUpdate: true
                });
            }
        }).catch(err => {
            console.log(err);
        });
    }

    updateSupport(values, dispatch){

        dispatch(updateSupportContent(values)).then(data => {
            if(data.success){
                this.setState({
                    supportUpdate: true
                });
            }
        }).catch(err => {
            console.log(err);
        });
    }

    updateAbout(values, dispatch){

        dispatch(updateAboutContent(values)).then(data => {
            if(data.success){
                this.setState({
                    aboutUpdate: true
                });
            }
        }).catch(err => {
            console.log(err);
        });
    }

    addToSite(id){
        this.props.dispatch(addMember(id)).then(data => {
            if(data.success){
                this.loadContent();
            }
        }).catch(err => {
            console.log(err);
        });
    }

    toggleCategoryModal(){
        this.setState({
            categoryModal: !this.state.categoryModal
        });
    }

    createCategory(values, dispatch){
        const self = this;
        console.log(values);
        dispatch(createNewCategory(values)).then(data => {
            if(data.success){
                self.loadContent();
            }
        }).catch(err => {
            console.log(err);
        });
    }

    deleteCategory(category){
        this.props.dispatch(deleteACategory(category)).then(data => {
            this.loadContent();
        }).catch(err => {
            console.log(err);
        });
    }

    toggleCreateModal(){
        this.setState({
            createModal: !this.state.createModal
        });
    }

    createStaffMember(values, dispatch){
        const self = this;
        dispatch(createStaff(values)).then(data => {
            self.toggleCreateModal();
            self.loadContent();
        }).catch(err => {
            console.log(err);
        });
    }

    render(){
        const { handleSubmit, homeCms, aboutCms, supportCms, team, staff, categories, user } = this.props;
        const { homeUpdate, aboutUpdate, supportUpdate } = this.state;

        return (
            <Container>
              <Row>
                <br />
              </Row>
              <Row>
                <Col md={12} className="text-center">
                  <h3>Settings</h3>
                </Col>
              </Row>
              <Row>
                <Col md={{size: 3, offset: 3}} className="text-center">
                  <button className="btn btn-secondary" onClick={this.toggleEditStaff}>Edit Profile</button>
                </Col>
                <Col md={3} className="text-center">
                  <button className="btn btn-secondary" onClick={this.toggleCategoryModal}>Add Category</button>
                </Col>
                <Col md={3} className="text-center">
                  <button className="btn btn-secondary" onClick={this.toggleCreateModal}>Add Staff Member</button>
                </Col>
              </Row>
              <Row>
                <br />
              </Row>
              <Row>
                <Col md={3} className="text-center">
                  <button className={this.state.view == 1 ? "btn btn-secondary btn-block btn-lg" : "btn btn-outline-secondary btn-block btn-lg"} onClick={() => this.setState({ view: 1 })}> Home</button>
                </Col>
                <Col md={3} className="text-center">
                  <button className={this.state.view == 2 ?  "btn btn-secondary btn-block btn-lg" : "btn btn-outline-secondary btn-block btn-lg" } onClick={() => this.setState({ view: 2 })}> About Us</button>
                </Col>
                <Col md={3} className="text-center">
                  <button className={this.state.view == 3 ?  "btn btn-secondary btn-block btn-lg" : "btn btn-outline-secondary btn-block btn-lg" } onClick={() => this.setState({ view: 3 })}> Support Us</button>
                </Col>
                <Col md={3} className="text-center">
                  <button className={this.state.view == 4 ?  "btn btn-secondary btn-block btn-lg" : "btn btn-outline-secondary btn-block btn-lg" } onClick={() => this.setState({ view: 4 })}> Team</button>
                </Col>
              </Row>
              <Row>
                <br />
              </Row>
              {
                  this.state.categoryModal &&
                      <Modal toggle={this.toggleCategoryModal} isOpen={this.state.categoryModal}>
                        <div className="modal-header">
                          <Container fluid={true}>
                            <Row>
                              <Col md={{size: 1, offset: 11}}>
                                <Button color="clear" onClick={this.toggleCategoryModal}>X</Button>
                              </Col>
                            </Row>
                          </Container>
                        </div>
                        <ModalBody>
                          <Container fluid={true}>
                             <form style={{padding: "5px"}} onSubmit={this.props.handleSubmit(this.createCategory)}>
                              <Row>
                               <Col md={9} style={{padding: "0"}}>
                                  <Field name="category" component="input" type="text" className="form-control" />
                                </Col>
                                <Col md={2}>
                                  <Button color="primary" type="submit">Create</Button>
                                </Col>
                              </Row>
                            </form>
                              {
                                  categories &&
                                      categories.map(c => (
                                          <React.Fragment>
                                             <Row style={{padding: "10px"}}>
                                              <Col md={9} className="align-self-center">
                                                {c}
                                              </Col>
                                              <Col md={2}>
                                                <Button color="primary" onClick={() => this.deleteCategory(c)}>Delete</Button>
                                              </Col>
                                            </Row>
                                          </React.Fragment>
                                      ))
                              }
                          </Container>
                        </ModalBody>
                      </Modal>
              }

              {
                  (this.state.view === 1 && homeCms) &&
                      <Container>
                        {
                            homeUpdate &&
                                <Alert color="success">
                                  Home Page Data Successfully Updated
                                </Alert>
                        }
                        <HomeCms home={this.props.homeCms} update={this.updateHome} />
                      </Container>
              }

              {
                  (this.state.view === 2 && aboutCms) &&
                      <Container>
                        {
                            aboutUpdate &&
                                <Alert color="success">
                                  About Page Data Successfully Updated
                                </Alert>
                        }
                        <AboutCms about={this.props.aboutCms} update={this.updateAbout}/>
                      </Container>
              }

              {
                  (this.state.view === 3 && supportCms) &&
                      <Container>
                        {
                            supportUpdate &&
                                <Alert color="success">
                                  Support Page Data Successfully Updated
                                </Alert>
                        }
                        <SupportCms support={this.props.supportCms} update={this.updateSupport} />
                      </Container>
              }

              {
                  (this.state.view === 4 && (staff && team)) &&
                      <Container>
                        <Row>
                          {
                              staff.map(s => (
                                  <TeamItem staff={s} shown={team.some(t => t === s._id)} addToSite={this.addToSite} />
                              ))
                          }
                        </Row>
                      </Container>
              }

              {this.state.createModal && <CreateStaff open={this.state.createModal} toggle={this.toggleCreateModal} create={handleSubmit(this.createStaffMember)} reset={this.props.reset} /> }
              {this.state.editStaffModal && <EditStaff open={this.state.editStaffModal} toggle={this.toggleEditStaff} user={user} edit={this.editStaffMember}/>}
            </Container>
        );
    }
}

const SettingsForm = reduxForm({
    form: "cmsForm"
})(SettingsT);

export const SettingsTab = connect(state => ({
    homeCms: (state.cms && state.cms.content) ? state.cms.content.home : [],
    supportCms: (state.cms && state.cms.content) ? state.cms.content.supportUs : [],
    aboutCms: (state.cms && state.cms.content) ? state.cms.content.aboutUs : [],
    staff: (state.adminUsers && state.adminUsers.staff) ? state.adminUsers.staff : [],
    team: (state.cms && state.cms.content) ? state.cms.content.team : [],
    categories: (state.cms && state.cms.content) ? state.cms.content.categories : [],
    user: state.user
}))(SettingsForm);
