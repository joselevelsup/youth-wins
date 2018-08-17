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

export const ResourceModal = ({ open, toggle, resource }) => (
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
                            {resource.organizationName}
                        </Row>
                        <Row>
                            {resource.description}
                        </Row>
                    </Col>
                </Row>
            }
        </ModalBody>
    </Modal>
);
