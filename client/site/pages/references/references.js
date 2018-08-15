import React from "react";
import { connect } from "react-redux";
import { Container, Row, Col, Button } from "reactstrap";
import YouthModal from "../../components/modal";
import { applyResource } from "../../actions/resource";

class Resources extends React.Component {

    constructor(){
        super();

        this.state = {
            modal: false
        }

        this.apply = this.apply.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
    }

    componentDidMount(){
        this.props.dispatch(fetchResources())
    }


    apply(resourceId){
        this.props.dispatch(applyResource(resourceId)).then(data => {
            
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

function mapStateToProps(state){
    return {
        resources: state.resources
    };
}

export default connect(mapStateToProps)(Resources)

