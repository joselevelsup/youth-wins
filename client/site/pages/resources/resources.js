import React from "react";
import { connect } from "react-redux";
import {
    Container,
    Row,
    Col,
    Button,
    InputGroup,
    InputGroupText,
    InputGroupAddon,
    Input
} from "reactstrap";
import Ionicon from "react-ionicons";
import { YouthModal, ResourceModal } from "../../components/modal";
import { fetchResources, applyResource } from "../../actions/resource";
import { chunk } from "../../components/helpers";
import { ResourceItem } from "../../components/items";

class Resources extends React.Component {

    constructor(){
        super();

        this.state = {
            modal: false,
            infoModal: false,
            resource: null
        }

        this.applyResource = this.applyResource.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.openInfoModal = this.openInfoModal.bind(this);
        this.toggleInfoModal = this.toggleInfoModal.bind(this);
    }

    componentDidMount(){
        this.props.dispatch(fetchResources());
    }


    applyResource(resourceId){
        const self = this;
        this.props.dispatch(applyResource(resourceId)).then(data => {
            self.toggleModal();
        }).catch(err => {
            console.log(err);
        });
    }

    openInfoModal(r){
        this.setState({
            infoModal: !this.state.infoModal,
            resource: r
        });
    }

    toggleModal(){
        this.setState({
            modal: !this.state.modal,
        });
    }

    toggleInfoModal(){
        this.setState({
            infoModal: !this.state.infoModal
        });
    }


    render(){
        const { resources } = this.props;
        return (
            <Container>
                <Row>
                    <br />
                </Row>
                <Row>
                    <Col md={12} className="text-center">
                        <h3> Explore Your Resources</h3>
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
                    {
                       resources && resources.map(r => (
                            <ResourceItem full={true} resource={r} openResource={this.openInfoModal} apply={this.applyResource} />
                        ))
                    }
                </Row>
                <ResourceModal open={this.state.infoModal} toggle={this.toggleInfoModal} apply={this.applyResource} resource={this.state.resource} />
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
