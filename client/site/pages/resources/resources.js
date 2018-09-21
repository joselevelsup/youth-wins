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
import * as _ from "lodash";
import Ionicon from "react-ionicons";
import { reduxForm, Field } from "redux-form";
import { states } from "../../constants/states";
import { ethnicity } from "../../constants/ethicity";
import { YouthModal, ResourceModal, DeclineModal } from "../../components/modal";
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
            filtered: false,
            rid: null
        };

        this.applyResource = this.applyResource.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.openInfoModal = this.openInfoModal.bind(this);
        this.toggleInfoModal = this.toggleInfoModal.bind(this);
        this.toggleDeclineModal = this.toggleDeclineModal.bind(this);
        this.filter = this.filter.bind(this);
        this.searchText = this.searchText.bind(this);
        this.showQualifiedResources = this.showQualifiedResources.bind(this);
    }

    componentDidMount(){
        this.props.dispatch(fetchResources()).then(data => {
            let params = new URLSearchParams(this.props.location.search).get("r");

            if(params){
                this.openResourceFromSearch(params);
            }
        });

        this.props.dispatch(getContent());

    }

    showQualifiedResources(){
        const { resources, user } = this.props;
        const qualifiedRes = resources.filter(r => {
            if(r.minIncome || r.maxIncome){
                if(r.minIncome && r.maxIncome){
                    if((user.income >= r.minIncome && user.income <= r.maxIncome)){
                        return r;
                    }
                }

                if(r.minIncome && !r.maxIncome){
                    if(user.income > r.minIncome){
                        return r;
                    }
                }

                if(r.maxIncome && !r.minIncome){
                    if(user.income < r.maxIncome){
                        return r;
                    }
                }
            } else {
                return r;
            }
        }).filter(r => {
            if(r.maxAge || r.minAge){
                if(r.maxAge && r.minAge){
                    if(user.age <= r.maxAge && user.age >= r.minAge){
                        return r;
                    }
                }

                if(r.maxAge && !r.minAge){
                    if(user.age <= r.maxAge){
                        return r;
                    }
                }

                if(r.minAge && !r.maxAge){
                    if(user.age >= r.minAge){
                        return r;
                    }
                }
            } else {
                return r;
            }
        }).filter(r => {
            if(r.inMilitary){
                if(user.inMilitary == true && r.inMilitary == true){
                    return r;
                }

                if(user.inMilitary == false && r.inMilitary == false){
                    return r;
                }
            } else {
                return r;
            }
        }).filter(r => {
            if(r.ethnicityServed && r.ethnicityServed.length >= 1){
                if(r.ethnicityServed.includes(user.ethnicity)){
                    return r;
                }
                if(r.ethnicityServed == "all"){
                    return r;
                }
            } else {
                return r;
            }
        });

        return qualifiedRes;
    }


    openResourceFromSearch(param){
        const { resources } = this.props;
        let resource = this.showQualifiedResources().filter(r => r._id === param)[0];

        if(resource == null){
            this.toggleDeclineModal();
        } else {
            this.setState({
                resource: resource,
                infoModal: true
            });
        }
    }


    applyResource(resourceId){
        const self = this;
        self.props.dispatch(applyResource(resourceId)).then(data => {
            self.toggleModal();
        }).catch(err => {
            console.log(err);
        });

        // if((resource.minIncome && resource.maxIncome) && resource.minIncome < user.income && resource.maxIncome > user.income){
        //     if(resource.ethnicityServed && resource.ethnicityServed.includes(user.ethnicity)){
        //         if(resource.inMilitary && (resource.inMilitary && !user.inMilitary) || (!resource.inMilitary && user.inMilitary)){
        //             self.toggleDeclineModal();
        //         } else {
        //             self.props.dispatch(applyResource(resourceId)).then(data => {
        //                 self.toggleModal();
        //             }).catch(err => {
        //                 console.log(err);
        //             });
        //         }
        //     } else {
        //         self.toggleDeclineModal();
        //     }
        // } else {
        //     if(resource.ethnicity && resource.ethnicityServed.includes(user.ethnicity)){
        //         if(resource.inMilitary && (resource.inMilitary && !user.inMilitary) || (!resource.inMilitary && user.inMilitary)){
        //             self.toggleDeclineModal();
        //         } else {
        //             self.props.dispatch(applyResource(resourceId)).then(data => {
        //                 self.toggleModal();
        //             }).catch(err => {
        //                 console.log(err);
        //             });
        //         }
        //     } else {
        //         if(resource.inMilitary && (resource.inMilitary && !user.inMilitary) || (!resource.inMilitary && user.inMilitary)){
        //             self.toggleDeclineModal();
        //         } else {
        //             self.props.dispatch(applyResource(resourceId)).then(data => {
        //                 self.toggleModal();
        //             }).catch(err => {
        //                 console.log(err);
        //             });
        //         }
        //     }
        // }

    }

    toggleDeclineModal(){
        this.setState({
            declineModal: !this.state.declineModal
        });
    }

    openInfoModal(r){
        this.setState({
            infoModal: !this.state.infoModal,
            resource: r
        });
    }

    toggleModal(id){
        this.setState({
            modal: !this.state.modal,
            rid: id
        });
    }

    toggleInfoModal(){
        this.setState({
            infoModal: !this.state.infoModal
        });
    }

    filter(values){
        const { reset, user, resources } = this.props;

        if(values.reset){
            this.setState({
                filtered: false
            });
            reset();
        } else {
            let filteredResources = (user && user.loggedIn == false) ? resources.filter(r => r.categories.some(c => c === values.categories)) : this.showQualifiedResources().filter(r => r.categories.some(c => c === values.categories));

            this.setState({
                filtered: true,
                res: filteredResources
            });
        }

    }

    searchText(e){
        const { resources, user } = this.props;

        if(e.target.value == ""){
            this.setState({
                filtered: false
            });
        } else {
            let filtered = (user && user.loggedIn == false) ? resources.filter(r => r.organizationName.toLowerCase() === e.target.value.toLowerCase()) : this.showQualifiedResources().filter(r => r.organizationName.toLowerCase() === e.target.value.toLowerCase());

            this.setState({
                filtered: true,
                res: filtered
            });
        }
    }


    render(){
        const { resources, user, categories } = this.props;
        const { res, filtered } = this.state;
        let userResources = user.loggedIn == false ? resources : this.showQualifiedResources();
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
                        (userResources && !filtered) && userResources.map(r => (
                            <ResourceItem full={true} resource={r} openResource={this.openInfoModal} apply={(user && user.loggedIn == false) ? () => this.toggleModal(r._id) : this.applyResource} />
                        ))
                    }
                  {
                      (res && filtered) && res.map(r => (
                          <ResourceItem full={true} resource={r} openResource={this.openInfoModal} apply={(user && user.loggedIn == false) ? () => this.toggleModal(r._id) : this.applyResource} />
                      ))
                  }
                </Row>
              {this.state.declineModal && <DeclineModal open={this.state.declineModal} toggle={this.toggleDeclineModal} openResourceModal={this.openInfoModal} resources={this.showQualifiedResources()}  user={user} applyResource={this.applyResource}/>}
                <ResourceModal open={this.state.infoModal} toggle={this.toggleInfoModal} apply={this.applyResource} resource={this.state.resource} />
              <YouthModal open={this.state.modal} resourceid={this.state.rid !== null ? this.state.rid : null}  push={this.props.history.push} applying={(user && user.loggedIn == false) ? false : true} toggle={this.toggleModal} />
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
