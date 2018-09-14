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
import { reduxForm, Field } from "redux-form";
import { states } from "../../constants/states";
import { ethnicity } from "../../constants/ethicity";
import { YouthModal, ResourceModal } from "../../components/modal";
import { fetchResources, applyResource } from "../../actions/resource";
import { getContent } from "../../actions/admin";
import { chunk } from "../../components/helpers";
import { ResourceItem } from "../../components/items";
import { Select } from "../../components/forms";

class Resources extends React.Component {

    constructor(){
        super();

        this.state = {
            modal: false,
            infoModal: false,
            resource: null,
            res: null,
            filtered: false
        };

        this.applyResource = this.applyResource.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.openInfoModal = this.openInfoModal.bind(this);
        this.toggleInfoModal = this.toggleInfoModal.bind(this);
        this.filter = this.filter.bind(this);
        this.searchText = this.searchText.bind(this);
    }

    componentDidMount(){
        this.props.dispatch(fetchResources());
        this.props.dispatch(getContent());
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

    filter(values){
        const { resources, reset } = this.props;

        if(values.reset){
            this.setState({
                filtered: false
            });
            reset();
        } else {
            let filteredResources = resources.filter(r => r.categories.some(c => c === values.categories));

            this.setState({
                filtered: true,
                res: filteredResources
            });
        }

    }

    searchText(e){
        const { resources } = this.props;

        if(e.target.value == ""){
            this.setState({
                filtered: false
            });
        } else {
            let filtered = resources.filter(r => r.organizationName.toLowerCase() === e.target.value.toLowerCase());

            this.setState({
                filtered: true,
                res: filtered
            });
        }
    }

    render(){
        const { resources, user, categories } = this.props;
        const { res, filtered } = this.state;
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
                        <InputGroup className="searchText">
                          <Input placeholder="Search" onChange={this.searchText} />
                            <InputGroupAddon addonType="append">
                                <InputGroupText><Ionicon icon="ios-search" /></InputGroupText>
                            </InputGroupAddon>
                        </InputGroup>
                    </Col>
                </Row>
              <br />
              <form>
                <Row>
                  <Col md={{size: 4, offset: 2}}>
                    <Field component={Select} className="form-control filter" name="categories">
                      <option value={null}>Select Category</option>
                      {
                          categories.map(s => (
                              <option value={s}>{s}</option>
                          ))
                      }
                    </Field>
                  </Col>
                  <Col md={2}>
                    <button className="btn btn-secondary btn-block" onClick={this.props.handleSubmit(this.filter)}>Filter</button>
                  </Col>
                  <Col md={2}>
                    <button className="btn btn-secondary btn-block" onClick={this.props.handleSubmit((values, dispatch) => this.filter({ ...values, reset: true }))}>Reset</button>
                  </Col>
                </Row>
              </form>
                <Row>
                    {
                        (resources && !filtered) && resources.map(r => (
                            <ResourceItem full={true} resource={r} openResource={this.openInfoModal} apply={(user && user.loggedIn == false) ? this.toggleModal : this.applyResource} />
                        ))
                    }
                  {
                      (res && filtered) && res.map(r => (
                          <ResourceItem full={true} resource={r} openResource={this.openInfoModal} apply={(user && user.loggedIn == false) ? this.toggleModal : this.applyResource} />
                      ))
                  }
                </Row>
                <ResourceModal open={this.state.infoModal} toggle={this.toggleInfoModal} apply={this.applyResource} resource={this.state.resource} />
              <YouthModal open={this.state.modal} push={this.props.history.push} applying={(user && user.loggedIn == false) ? false : true} toggle={this.toggleModal} />
            </Container>
        );
    }
}

function mapStateToProps(state){
    return {
        resources: state.resources,
        user: state.user,
        categories: state.content && state.content.content.categories
    };
}

const ResourcesF = reduxForm({
    form: "resource-filter"
})(Resources);

export default connect(mapStateToProps)(ResourcesF)
