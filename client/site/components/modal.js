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

export const ResourceModal = ({ open, toggle, resource, apply }) => (
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
                        <img src={resource.logo} />
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
        <ModalFooter>
                <Col md={{size: 3, offset: 9}}>
                    <Button className="primary" onClick={() => apply(resource._id)}>Apply</Button>
                </Col>
        </ModalFooter>
    </Modal>
);
