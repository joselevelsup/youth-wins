import React from "react";
import { connect } from "react-redux";
import { Field } from "redux-form";
import DropzoneInput from "../components/dropzone";
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
import { AppItem } from "../components/items";

export const YouthModal = ({ open, toggle, applying, push }) => (
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
         <Button color="primary" style={{width: 200}} block  className="btn-swerve" onClick={applying ? () => toggle() : () => push("/signup")}>Continue</Button>
        </div>
      </ModalFooter>
    </Modal>
);

export const ResourceModal = ({ open, toggle, resource, apply, admin, edit, remove, approve, deny, status }) => (
    <Modal isOpen={open} toggle={toggle}>
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
                    <Col>
                        <Row>
                           <h3> {resource.organizationName}</h3>
                        </Row>
                        <Row>
                            <p>{resource.description}</p>
                        </Row>
                    </Col>
                </Row>
                    <React.Fragment>
                    {
                      (typeof status !== "undefined") &&
                            <Row>
                              <Col md={{size: 2, offset: 4}} className="text-center">
                                <label className="custom-check">
                                  <input type="checkbox" checked={status} />
                                  <span className="checkmark"></span>
                                </label>
                              </Col>
                              <Col className="align-self-center">
                                <div className="align-middle">
                                  <h5>Responded</h5>
                                </div>
                              </Col>
                            </Row>
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
                        <Button className="primary" onClick={() => apply(resource._id)}>Apply</Button>
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
);


export const StaffModal = ({ open, toggle, staff, deleteStaff }) => (
    <Modal isOpen={open} toggle={toggle}>
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
                            <h3>{staff.position}</h3>
                        </Row>
                        <Row>
                            <h3>{staff.email}</h3>
                        </Row>
                        <Row>
                            <p>{staff.description}</p>
                        </Row>
                    </Col>
                </Row>
            }
        </ModalBody>
        <ModalFooter>
            <Col md={{size: 3, offset: 9}}>
                <Button color="primary" onClick={() => deleteStaff(staff._id)}>Remove</Button>
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
            <Modal isOpen={open} toggle={toggle} size="lg">
              <ModalBody>
                {
                    user !== null &&
                        <React.Fragment>
                          <Row>
                            <Col md={4}>
                              <img className="img-fluid rounded-circle" src={user.profile} />
                            </Col>
                            <Col md={7}>
                              <h4>{user.firstName} {user.lastName}</h4>
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

export class CreateResource extends React.Component {
    componentWillUnmount(){
        this.props.reset();
    }
    componentDidMount(){
        this.props.reset();
    }

    render(){
        const { open, toggle, create, createValues } = this.props;
        return (
            <Modal isOpen={open} toggle={toggle} size="lg">
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


export const CreateStaff = ({ open, toggle, create }) => (
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
                    <Field name="bio" className="form-control" component="textarea" />
                  </div>
                </div>
              </div>
            </div>
					  <Button color="warning" type="submit">submit</Button>
          </form>
      </ModalBody>
    </Modal>
)
