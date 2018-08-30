import React from "react";
import { Field } from "redux-form";
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

export const YouthModal = ({ open, toggle }) => (
        <Modal isOpen={open} toggle={toggle}>
            <ModalHeader toggle={toggle}> Thank you for applying</ModalHeader>
            <ModalFooter><Button color="primary" onClick={toggle}>Continue</Button></ModalFooter>
        </Modal>
);

export const ResourceModal = ({ open, toggle, resource, apply, admin, edit, remove, approve, deny }) => (
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
                <Row>
                    <Col md={4}>
                        <img className="rounded-circle" src={resource.logo} />
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
                        <img className="rounded-circle" src={staff.profile} />
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

export const UserModal = ({ open, toggle, user }) => (
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
            
        </ModalBody>
    </Modal>
)

export const CreateResource = ({ open, toggle, create }) => (
    <Modal isOpen={open} toggle={toggle}>
      <ModalBody>
        <main className="form-wrap">
          <form onSubmit={create} className="support-form">
					  <div className="form-group support-form-items">
						  <label>Name</label>
						  <Field name="orgName" className="form-control" component="input" type="text" />
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
)

export const EditResource = ({ open, toggle, resource }) => (
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
        <main className="form-wrap">
          <form className="support-form">
					  <div className="form-group support-form-items">
						  <label>Organization Name</label>
						  <Field name="orgName" className="form-control" component="input" type="text" />
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
)


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
                <br />
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
              </div>
            </div>
					  <Button color="warning" type="submit">submit</Button>
          </form>
      </ModalBody>
    </Modal>
)
