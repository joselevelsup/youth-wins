import React from "react";
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

export const ResourceModal = ({ open, toggle, resource, apply, admin }) => (
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
                            <Button block color="primary">Approve</Button>
                        </Col>
                        <Col md={4}>
                            <Button block color="secondary">Deny</Button>
                        </Col>
                    </ModalFooter>
                    :
                    <ModalFooter>
                        <Col md={{size: 4, offset: 4}}>
                            <Button block color="primary">Edit</Button>
                        </Col>
                        <Col md={4}>
                            <Button block color="secondary">Remove</Button>
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
