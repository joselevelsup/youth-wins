import React from "react";
import { Container, Row, Col, Button } from "reactstrap";
import YouthModal from "../../components/modal";
import { applyResource } from "../../actions/api";


export default class References extends React.Component {

    constructor(){
        super();

        this.state = {
            modal: false
        }

        this.apply = this.apply.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
    }


    apply(resourceId){
        this.props.dispatch(applyResource(resourceId)).then( data => {
            
        }).catch(err => {
            
        })
    }

    toggleModal(){
        this.setState({
            modal: !this.state.modal
        });
    }


    render(){
        return (
            <Container>
                <Button color="primary" onClick={this.toggleModal}>Open</Button>
                <YouthModal open={this.state.modal} toggle={this.toggleModal} />
            </Container>
        );
    }
}
