import React from "react";
import { Button, Modal, ModalHeader, ModalFooter } from "reactstrap";

export default ({ open, toggle }) => (
        <Modal isOpen={open} toggle={toggle}>
            <ModalHeader toggle={toggle}> Thank you for applying</ModalHeader>
            <ModalFooter><Button color="primary" onClick={toggle}></Button></ModalFooter>
        </Modal>
)
