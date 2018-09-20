import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { reduxForm, Field } from "redux-form";
import DropzoneInput from "../components/dropzone";
import SelectField from "../components/multi-select";
import { ethnicity } from "../constants/ethnicity";
import { education } from "../constants/educationlevels";
import { states } from "../constants/states";
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Container,
    Row,
    Col
} from "reactstrap";
import { AppItem, ResourceItem } from "../components/items";
import { websiteValid } from "./helpers";

export const DeleteUserModal = ({ open, toggle, deleteUser }) => (
    <Modal isOpen={open} toggle={toggle}>
      <ModalHeader toggle={toggle}>
        Delete User?
      </ModalHeader>
      <ModalBody>
         <p>Deleting this user will result in the user not being able to log into this platform.</p>
      </ModalBody>
      <ModalFooter>
        <Col>
          <Button block color="secondary" onClick={toggle}>{`No, Do not remove the user`}</Button>
        </Col>
        <Col>
          <Button block color="warning" onClick={deleteUser}>{`Yes, Remove the user`}</Button>
        </Col>
      </ModalFooter>
    </Modal>
)

export const YouthModal = ({ open, toggle, applying, push, resourceid }) =>{
    return (
        <Modal isOpen={open} toggle={toggle}>
          <ModalHeader toggle={toggle} className="text-center info-header">
            {
                applying ?
                    `Thank you for applying`
                    :
                    `You are currently not logged in. Please Sign up in order to apply for this resource`
            }
          </ModalHeader>
          <ModalFooter>
            <div className="ml-auto mr-auto">
              <Button color="primary" style={{width: 200}} block  className="btn-swerve" onClick={applying ? () => toggle() : () => push(`/signup/?r=${resourceid}`)}>Continue</Button>
            </div>
          </ModalFooter>
        </Modal>
    );
}

export class DeclineModal extends React.Component{
    render(){
        const { open, toggle, suggestedResources, openResourceModal, applyResource } = this.props;

        return (
            <Modal size="lg" isOpen={open} toggle={toggle}>
              <ModalHeader toggle={toggle} className="text-center info-header">
                The Resource you tried to apply for, you are not qualified for. Please look at these suggested resources. 
              </ModalHeader>
              <ModalBody>
                <Row>
                  {
                      suggestedResources.map(r => (
                          <ResourceItem resource={r} full={false} openResource={openResourceModal} />
                      ))
                  }
                </Row>
              </ModalBody>
            </Modal>
        )
    }
}

export class ResourceModal extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            checked: props.status || null
        };

        this.toggleResponse = this.toggleResponse.bind(this);
    }

    toggleResponse(e){
        this.props.toggleResponse(this.state.checked);
        this.setState({
            checked: !this.state.checked
        });
    }

    render(){
        const { open, toggle, resource, apply, admin, edit, remove, approve, deny, status, user, created } = this.props;
        return (
            <Modal size="lg" isOpen={open} toggle={toggle}>
              <div className="modal-header">
                <Container fluid={true}>
                  <Row>
                    <Col md={{size: 1, offset: 11}}>
                      <Button color="clear" onClick={toggle}>X</Button>
                    </Col>
                  </Row>
                </Container>
              </div>
              <ModalBody>
                {
                    resource &&
                        <React.Fragment>
                          <Row>
                            <Col md={4}>
                              <img className="img-fluid rounded-circle" src={resource.logo} />
                            </Col>
                            <Col md={8}>
                              {
                                  user &&
                                      <React.Fragment>
                                        <Row>
                                          <h4>{user.firstName} {user.lastName}</h4>
                                        </Row>
                                        <Row>
                                          {created && <h4>{new Date(created).toLocaleDateString()}</h4>}
                                        </Row>
                                      </React.Fragment>
                              }
                              <Row>
                                <h4> {resource.organizationName}</h4>
                              </Row>
                              <Row>
                                <br />
                              </Row>
                              <Row>
                                <h5>{resource.contactEmail}</h5>
                              </Row>
                              <Row>
                                <h5>{resource.phone}</h5>
                              </Row>
                              <Row>
                                <h5><a target="_blank" href={websiteValid(resource.website) ? resource.website : `http://${resource.website}`}>{resource.website}</a></h5>
                              </Row>
                              <Row>
                                <p>{resource.description}</p>
                              </Row>
                            </Col>
                          </Row>
                          <React.Fragment>
                            {
                                (typeof status !== "undefined") &&
                                    <React.Fragment>
                                      <Row>
                                        <br />
                                      </Row>
                                      <Row>
                                        <Col md={{size: 2, offset: 4}} className="text-center">
                                          <label className="custom-check">
                                            <input type="checkbox" checked={this.state.checked} onChange={this.toggleResponse}  />
                                            <span className="checkmark"></span>
                                          </label>
                                        </Col>
                                        <Col className="align-self-center">
                                          <div className="align-middle">
                                            <h5>Responded</h5>
                                          </div>
                                        </Col>
                                      </Row>

                                    </React.Fragment>
                            }
                          </React.Fragment>
                        </React.Fragment>
                }
              </ModalBody>
              <React.Fragment>
                {
                    apply &&
                        <ModalFooter>
                          <Col md={{size: 3, offset: 9}}>
                            <Button block className="primary" onClick={() => apply(resource._id)}>Apply</Button>
                          </Col>
                        </ModalFooter>
                }
                {
                    (resource && admin) && (
                        resource.pending ?
                            <ModalFooter>
                              <Col md={{size: 4, offset: 4}}>
                                <Button onClick={approve} block color="primary">Approve</Button>
                              </Col>
                              <Col md={4}>
                                <Button onClick={deny} block color="secondary">Deny</Button>
                              </Col>
                            </ModalFooter>
                        :
                        <ModalFooter>
                          <Col md={{size: 4, offset: 4}}>
                            <Button onClick={edit} block color="primary">Edit</Button>
                          </Col>
                          <Col md={4}>
                            <Button onClick={remove} block color="secondary">Remove</Button>
                          </Col>
                        </ModalFooter>
                    )
                }
              </React.Fragment>
            </Modal>
        )
    }
}


export const StaffModal = ({ open, toggle, staff, editStaff, deleteStaff }) => (
    <Modal size="lg" isOpen={open} toggle={toggle}>
        <div className="modal-header">
            <Container fluid={true}>
                <Row>
                    <Col md={{size: 1, offset: 11}}>
                        <Button color="clear" onClick={toggle}>X</Button>
                    </Col>
                </Row>
            </Container>
        </div>
        <ModalBody>
            {
                staff &&
                <Row>
                    <Col md={4}>
                        <img className="img-fluid rounded-circle" src={staff.profile} />
                    </Col>
                    <Col>
                        <Row>
                           <h3> {staff.firstName} {staff.lastName}</h3>
                        </Row>
                        <Row>
                            <h4>{staff.position}</h4>
                        </Row>
                        <Row>
                            <h4>{staff.email}</h4>
                        </Row>
                        <Row>
                            <p>{staff.description}</p>
                        </Row>
                    </Col>
                </Row>
            }
        </ModalBody>
      <ModalFooter>
        <Col md={{ size: 3, offset: 6 }}>
          <Button block color="primary" onClick={editStaff}>Edit</Button>
        </Col>
        <Col md={3}>
          <Button block color="secondary" onClick={() => deleteStaff(staff._id)}>Remove</Button>
        </Col>
      </ModalFooter>
    </Modal>
)

class UserM extends React.Component {
    constructor(){
        super();

        this.state = {
            resourceModal: false,
            resource: null
        };

        this.toggleModal = this.toggleModal.bind(this);
        this.openResource = this.openResource.bind(this);
    }

    toggleModal(){
        this.setState({
            resourceModal: !this.state.resourceModal
        });
    }

    openResource(r){
        this.setState({
            resource: r,
            resourceModal: true
        });
    }

    render(){
        const { open, toggle, user, apps } = this.props;
        const userApps = (apps.applications && user !== null) ? apps.applications.filter(a => a.user === user._id) : apps;
        return (
            <React.Fragment>
              <Modal size="lg" isOpen={open} toggle={toggle} size="lg">
                <ModalBody>
                  {
                      user !== null &&
                          <React.Fragment>
                            <Row>
                              <Col md={4}>
                                <img className="img-fluid rounded-circle" src={user.profile} />
                              </Col>
                              <Col md={7}>
                                <Row>
                                  <h4>{`Name: ${user.firstName} ${user.lastName}`}</h4>
                                </Row>
                                <Row>
                                  {`Address: ${user.streetAddress} ${user.city}, ${user.state} ${user.zipCode}`}
                                </Row>
                                <Row>
                                  {`Age: ${user.age}`}
                                </Row>
                                <Row>
                                 {`Ethnicity: ${user.ethnicity}`}
                                </Row>
                                <Row>
                                  {`Email: ${user.email}`}
                                </Row>
                                <Row>
                                  {`Education: ${user.educationLevel}`}
                                </Row>
                              </Col>
                              <Col md={1}>
                                <Button color="clear" onClick={toggle}>X</Button>
                              </Col>
                            </Row>
                            <Row>
                              {
                                  userApps.length > 1 ?
                                      userApps.map(ua => (
                                          <AppItem size={6} openResource={this.openResource} deleteApp={this.deleteApp} resource={ua.resource} status={ua.status} />
                                      ))
                                      :
                                      <Col md={12}>
                                        <div className="show-warning">
                                          <h3>User has not applied to any resources</h3>
                                        </div>
                                      </Col>
                              }
                            </Row>
                          </React.Fragment>
                  }
                </ModalBody>
              </Modal>
              <ResourceModal open={this.state.resourceModal} resource={this.state.resource} toggle={this.toggleModal} />
            </React.Fragment>
        )
    }
}

export const UserModal = connect(state => ({
    apps: state.adminApps
}))(UserM);

class CreateRes extends React.Component {
    componentWillUnmount(){
        this.props.reset();
    }
    componentDidMount(){
        this.props.reset();
    }

    render(){
        const { open, toggle, create, createValues, categories } = this.props;
        return (
            <Modal isOpen={open} toggle={toggle} size="lg">
              <div className="modal-header">
                <Container fluid={true}>
                  <Row>
                    <Col md={{size: 1, offset: 11}}>
                      <Button color="clear" onClick={toggle}>X</Button>
                    </Col>
                  </Row>
                </Container>
              </div>
              <ModalBody>
                <form onSubmit={create}>
                  <Row>
                    <Col md={6}>
					            <div className="form-group">
						            <label>Name</label>
						            <Field name="organizationName" className="form-control" component="input" type="text" />
					            </div>
                    </Col>
                    <Col md={6}>
					            <div className="form-group">
						            <label>Email</label>
						            <Field name="email" className="form-control" component="input" type="email" />
					            </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <div className="form-group">
						            <label>Website</label>
						            <Field name="website" className="form-control" component="input" type="text" />
					            </div>
                    </Col>
                    <Col md={6}>
                      <div className="form-group">
						            <label>Contact Email</label>
						            <Field name="contactEmail" className="form-control" component="input" type="text" />
					            </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <label>Ethnicity Served</label>
                      <Field component={SelectField} name="ethnicityServed" options={ethnicity.map(e => ({ value: e, label: e}))} />
                    </Col>
                    <Col md={6}>
                      <label>State Served</label>
                      <Field component={SelectField} name="stateServed" options={states.map(s => ({ value: s.abbreviation, label: s.name}))} />
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <label>Categories</label>
                      <Field name="categories" component={SelectField} options={categories.map(c => ({ label: c, value: c}))}/>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <div className="form-group">
						            <label>Description</label>
						            <Field name="description" className="form-control" component="textarea" />
					            </div>
                    </Col>
                    <Col md={6}>
                      <label>Logo</label>
                      <Row>
                        {
                            (createValues && createValues.logo) &&
                                <Col md={{size: 8, offset: 2}}>
                                  <img src={createValues.logo && createValues.logo[0].preview} className="img-fluid"/>
                                </Col>
                        }
                        <Col md={2} className="align-self-center">
                          <Field className="picture-upload align-middle" component={DropzoneInput} name="logo"/>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={{size: 4, offset: 4}}>
					            <Button color="warning" className="btn-swerve" block type="submit">Create</Button>
                    </Col>
                  </Row>
                </form>
              </ModalBody>
            </Modal>
        );
    }
}

export const CreateResource = connect(state => ({
    categories: (state.content && state.content.content) ? state.content.content.categories : []
}))(CreateRes);

export class EditResource extends React.Component{
    
    componentDidMount(){
        this.props.init(this.props.resource);
    }

    componentWillUnmount(){
        this.props.reset();
    }

    render(){
        const { open, toggle, resource, updateRes } = this.props;
        return (
            <Modal isOpen={open} toggle={toggle} size="lg">
              <div className="modal-header">
                <Container fluid={true}>
                  <Row>
                    <Col md={{size: 1, offset: 11}}>
                      <Button color="clear" onClick={toggle}>X</Button>
                    </Col>
                  </Row>
                </Container>
              </div>
              <ModalBody>
                <form onSubmit={updateRes}>
                  <Row>
                    <Col md={6}>
					            <div className="form-group">
						            <label>Name</label>
						            <Field name="organizationName" className="form-control" component="input" type="text" />
					            </div>
                    </Col>
                    <Col md={6}>
					            <div className="form-group">
						            <label>Email</label>
						            <Field name="email" className="form-control" component="input" type="email" />
					            </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <div className="form-group">
						            <label>Website</label>
						            <Field name="website" className="form-control" component="input" type="text" />
					            </div>
                    </Col>
                    <Col md={6}>
                      <div className="form-group">
						            <label>Contact Email</label>
						            <Field name="contactEmail" className="form-control" component="input" type="text" />
					            </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <label>Ethnicity Served</label>
                      <Field component={SelectField} name="ethnicityServed" options={ethnicity.map(e => ({ value: e, label: e}))} />
                    </Col>
                    <Col md={6}>
                      <label>State Served</label>
                      <Field component={SelectField} name="stateServed" options={states.map(s => ({ value: s.abbreviation, label: s.name}))} />
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <div className="form-group">
						            <label>Description</label>
						            <Field name="description" className="form-control" component="textarea" />
					            </div>
                    </Col>
                    <Col md={6}>
                      <label>Logo</label>
                      <Row>
                        <Col md={{size: 8, offset: 2}}>
                          <img src={resource ? resource.logo : null} className="img-fluid"/>
                        </Col>
                        <Col md={2} className="align-self-center">
                          <Field className="picture-upload align-middle" component={DropzoneInput} name="logo"/>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={{size: 4, offset: 4}}>
					            <Button color="warning" className="btn-swerve" block type="submit">Update</Button>
                    </Col>
                  </Row>
                </form>
              </ModalBody>
            </Modal>
        )
    }
}

export class CreateStaff extends React.Component {

    componentWillUnmount(){
        this.props.reset();
    }

    componentDidMount(){
        this.props.reset();
    }

    render(){

        const { open, toggle, create } = this.props;

        return (
            <Modal isOpen={open} toggle={toggle} size="lg">
              <div className="modal-header">
                <Container fluid={true}>
                  <Row>
                    <Col md={{size: 1, offset: 11}}>
                      <Button color="clear" onClick={toggle}>X</Button>
                    </Col>
                  </Row>
                </Container>
              </div>
              <ModalBody>
                <form onSubmit={create}>
                  <div className="row">
                    <div className="col-4">
                      <Field name="profile" component={DropzoneInput} className="picture-upload" />
                    </div>
                    <div className="col-8">
                      <div className="row">
                        <div className="col-6">
					                <div className="form-group">
						                <label>First Name</label>
						                <Field name="firstName" className="form-control" component="input" type="text" />
					                </div>
                        </div>
                        <div className="col-6">
					                <div className="form-group">
						                <label>Position</label>
						                <Field name="position" className="form-control" component="input" type="text" />
					                </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-6">
					                <div className="form-group">
						                <label>Last Name</label>
						                <Field name="lastName" className="form-control" component="input" type="text" />
					                </div>
                        </div>
                        <div className="col-6">
					                <div className="form-group">
						                <label>Password</label>
						                <Field name="password" className="form-control" component="input" type="password" />
					                </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-6">
					                <div className="form-group">
						                <label>Email</label>
						                <Field name="email" className="form-control" component="input" type="text" />
					                </div>
                        </div>
                        <div className="col-6">
					                <div className="form-group">
						                <label>Confirm Password</label>
						                <Field name="cpassword" className="form-control" component="input" type="password" />
					                </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-12">
                          <label>Bio</label>
                          <Field name="description" className="form-control" component="textarea" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <br />
                  </div>
                  <div className="row">
                    <div className="offset-4 col-4">
					            <Button color="warning" className="btn-swerve" block type="submit">Create</Button>
                    </div>
                  </div>
                </form>
              </ModalBody>
            </Modal>
        )
    }
}


export class EditStaff extends React.Component{
    componentDidMount(){
        this.props.init(this.props.user);
    }

    componentWillUnmount(){
        this.props.reset();
    }

    render(){

        const { open, toggle, edit } = this.props;

        return (
            <Modal isOpen={open} toggle={toggle} size="lg">
              <div className="modal-header">
                <Container fluid={true}>
                  <Row>
                    <Col md={{size: 1, offset: 11}}>
                      <Button color="clear" onClick={toggle}>X</Button>
                    </Col>
                  </Row>
                </Container>
              </div>
              <ModalBody>
                <form onSubmit={edit}>
                  <div className="row">
                    <div className="col-4">
                      <Field name="profile" component={DropzoneInput} className="picture-upload" />
                    </div>
                    <div className="col-8">
                      <div className="row">
                        <div className="col-6">
					                <div className="form-group">
						                <label>First Name</label>
						                <Field name="firstName" className="form-control" component="input" type="text" />
					                </div>
                        </div>
                        <div className="col-6">
					                <div className="form-group">
						                <label>Position</label>
						                <Field name="position" className="form-control" component="input" type="text" />
					                </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-6">
					                <div className="form-group">
						                <label>Last Name</label>
						                <Field name="lastName" className="form-control" component="input" type="text" />
					                </div>
                        </div>
                        <div className="col-6">
					                <div className="form-group">
						                <label>Password</label>
						                <Field name="password" className="form-control" component="input" type="password" />
					                </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-6">
					                <div className="form-group">
						                <label>Email</label>
						                <Field name="email" className="form-control" component="input" type="text" />
					                </div>
                        </div>
                        <div className="col-6">
					                <div className="form-group">
						                <label>Confirm Password</label>
						                <Field name="cpassword" className="form-control" component="input" type="password" />
					                </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-12">
                          <label>Bio</label>
                          <Field name="description" className="form-control" component="textarea" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <br />
                  </div>
                  <div className="row">
                    <div className="offset-4 col-4">
					            <Button color="warning" className="btn-swerve" block type="submit">Update</Button>
                    </div>
                  </div>
                </form>
              </ModalBody>
            </Modal>
        )
    }
}


class UserEditModal extends React.Component{
    componentDidMount(){
        this.props.initialize(this.props.user);
    }

    componentWillUnmount(){
        this.props.destroy();
    }

    render(){
        const { open, toggle, categories, edit, handleSubmit } = this.props;
        return (
            <Modal isOpen={open} toggle={toggle} size="lg">
              <ModalBody>
                <form onSubmit={handleSubmit(edit)}>
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-6">
                      <label>Email</label>
                      <Field name="email" component="input" className="form-control" type="email" />
                    </div>
                    <div className="col-6">
                      <label>First Name</label>
                      <Field name="firstName" component="input" className="form-control" type="text" />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-6">
                      <label>Last Name</label>
                      <Field name="lastName" component="input" className="form-control" type="text" />
                    </div>
                    <div className="col-6">
                      <label>Phone Number </label>
                      <Field name="phone" component="input" className="form-control" type="text" />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-6">
                      <label>Street Address</label>
                      <Field name="streetAddress" component="input" className="form-control" type="text" />
                    </div>
                    <div className="col-6">
                      <label>City</label>
                      <Field name="city" component="input" className="form-control" type="text" />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-6">
                      <label>State</label>
                      <Field name="state" component="input" className="form-control" type="text" />
                    </div>
                    <div className="col-6">
                      <label>Zip Code</label>
                      <Field name="zipCode" component="input" className="form-control" type="number" />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-6">
                      <label>Income</label>
                      <Field name="income" component="input" className="form-control" type="number" />
                    </div>
                    <div className="col-6">
                      <label>Age</label>
                      <Field name="age" component="input" className="form-control" type="number" />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-6">
                      <label>Gender</label>
                      <Field name="gender" component="input" className="form-control" type="text" />
                    </div>
                    <div className="col-6">
                      <label>Ethnicity</label>
                      <Field className="form-control" component="select" name="ethnicity"  id="exampleSelect">
							          <option>- Select Ethnicity -</option>
                        {
                            ethnicity.map(e => (
                                <option value={e}>{e}</option>
                            ))
                        }
						          </Field>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-6">
                      <label>Are you in the Military?</label>
                      <br />
                      <label className="pr-2">
							          <Field component="input" type="radio" value="true" name="inMilitary" />{' '}
								        Yes
							        </label>
							        <label>
							          <Field component="input" type="radio" value="false" name="inMilitary" />{' '}
								        No
							        </label>
                    </div>
                    <div className="col-6">
                      <label>Education Level</label>
                      <Field className="form-control" name="educationLevel" component="select" >
                        <option>Select Education Level</option>
                        {
                            education.map(e => (
                                <option value={e}>{e}</option>
                            ))
                        }
                      </Field>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12">
                      <label>Categories you are interested in</label>
                      <Field component={SelectField} name="categoriesOfInterest" options={categories.map(c => ({ label: c, value: c}))} /> 
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-6">
                      <label>New Password</label>
                      <Field name="password" className="form-control" component="input" type="password" />
                    </div>
                    <div className="col-6">
                      <label>Confirm New Password</label>
                      <Field name="newpassword" className="form-control" component="input" type="password" />
                    </div>
                  </div>
                  <div className="row">
                    <br />
                  </div>
                  <div className="row">
                    <div className="offset-4 col-4">
                      <button className="btn btn-block btn-swerve btn-primary" type="submit">Update</button>
                    </div>
                  </div>
                </div>
                </form>
              </ModalBody>
            </Modal>
        );
    }
}

export const UserEditFormModal = connect(state => ({
    categories: state.content && state.content.content.categories
}))(reduxForm({
    form: "editUser"
})(UserEditModal));
