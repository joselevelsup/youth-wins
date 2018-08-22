import React from "react";
import { connect } from "react-redux";
import { Container, Row, Col, Button, Media } from "reactstrap";
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
        const { res: { resources } } = this.props;
        return (
            <Container>
                <Row>
                    <Col md={12}><br/></Col>
                </Row>
                <Row>
                    {
                       resources && resources.map(r => (
                            <ResourceItem resource={r} openResource={this.openInfoModal} />
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
        res: state.resources
    };
}

export default connect(mapStateToProps)(Resources)

/* <Col md={6}>
 *                                 <div className="media">
 *                                     <img className="align-self-center mr-3 rounded-circle" width="128" height="128" src={r.logo} />
 *                                     <div className="media-body">
 *                                         <h5 className="mt-0">{r.organizationName}</h5>
 *                                         <div className="row">
 *                                             <div className="col-10">
 *                                                 <p>{r.description}</p>
 *                                             </div>
 *                                             <div className="col-2">
 *                                                 <div className="row">
 *                                                     <div className="col-12">
 *                                                         <Button color="primary" onClick={() => this.applyResource(r._id)}>Apply</Button>
 *                                                     </div>
 *                                                     <div className="w-100"></div>
 *                                                     <div className="col-12">
 *                                                         <Button color="clear" onClick={() => this.openInfoModal(r)}>More</Button>
 *                                                     </div>
 *                                                 </div>
 *                                             </div>
 *                                         </div>
 *                                     </div>
 *                                 </div>
 * </Col> */
