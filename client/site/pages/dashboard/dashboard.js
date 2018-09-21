import React from "react";
import { connect } from "react-redux";
import { Alert } from "reactstrap";
import * as _ from "lodash";
import {
    getUserInfo,
    getUserSuggested,
    toggleResponse,
    deleteApp,
    editUser,
} from "../../actions/dashboard";
import { getCurrentUser } from "../../actions/auth";
import { fetchResources, applyResource } from "../../actions/resource";
import { YouthModal, ResourceModal, UserEditFormModal } from "../../components/modal";
import { AppItem, ResourceItem } from "../../components/items";
import "./dashboard.scss";

class Dashboard extends React.Component{
    constructor(){
        super();

        this.state = {
            resourceModal: false,
            appModal: false,
            userModal: false,
            resource: null,
            status: null,
            updated: false
        };

        this.loadUserInfo = this.loadUserInfo.bind(this);
        this.openResource = this.openResource.bind(this);

        this.toggleAppModal = this.toggleAppModal.bind(this);
        this.toggleResource = this.toggleResource.bind(this);
        this.toggleResponse = this.toggleResponse.bind(this);
        this.toggleUserModal = this.toggleUserModal.bind(this);

		    this.applyResource = this.applyResource.bind(this);

        this.deleteApplication = this.deleteApplication.bind(this);

        this.editUserInfo = this.editUserInfo.bind(this);
    }


	applyResource(resourceId){
		  const self = this;
      this.props.dispatch(applyResource(resourceId)).then(data => {
          self.toggleAppModal();
          self.loadUserInfo();
      }).catch(err => {
          console.log(err);
      });
    }

    loadUserInfo(){
        this.props.dispatch(fetchResources());
        this.props.dispatch(getUserInfo());
    }

    componentDidMount(){
        this.loadUserInfo();
    }

    openResource(r, stat, id, user, created){
        this.setState({
            resource: r,
            appId: id,
            status: stat,
            user: user,
            created: created,
            resourceModal: true
        });
    }

    toggleResource(){
        this.setState({
            resourceModal: !this.state.resourceModal
        });
    }

    toggleResponse(status){
        this.props.dispatch(toggleResponse(status, this.state.appId)).then(data => {
            if(data.success){
                this.loadUserInfo();
            }
        }).catch(err => {
            console.log(err)
        });
    }

    toggleAppModal(){
        this.setState({
            appModal: !this.state.appModal
        });
    }

    toggleUserModal(){
        this.setState({
            userModal: !this.state.userModal
        });
    }

    deleteApplication(appId){
        const self = this;
        this.props.dispatch(deleteApp(appId)).then(data => {
            self.loadUserInfo();
        }).catch(err => {
            console.log(err);
        });
    }

    editUserInfo(values, dispatch){
        dispatch(editUser(values)).then(data => {
            if(data.success){
                this.props.dispatch(getCurrentUser());
                this.loadUserInfo();
                this.toggleUserModal();
                this.setState({
                    updated: true
                });
            }
        }).catch(err => {
            console.log(err);
        });
    }

    render(){
		    const { resources, applications, user } = this.props;
        let suggestions = resources.filter(r => {
            if(r.categories == "all"){
                return r;
            }
            if(!!_.intersection(r.categories, user.categoriesOfInterest).length){
                return r;
            }
        });

        return(
            <div className="container dashboard">
              <div className="row">
                <br />
              </div>
              {
                  this.state.updated &&
                      <div className="row">
                        <div className="col-12">
                          <Alert color="success">Successfully updated profile</Alert>
                        </div>
                      </div>
              }
				      <div className="row">
                <div className="col-2">
					        {user.profile ? <img className="img-fluid rounded-circle border-color" src={user.profile}/> : null}
                </div>
                <div className="col-8 align-self-center"> 
					        <h3 className="welcome">Welcome {user.firstName} {user.lastName}</h3>
                </div>
                <div className="col-2">
                  <button className="btn btn-secondary btn-block" onClick={this.toggleUserModal}>Edit</button>
                </div>
				      </div>
              <div className="row">
                <div className="col-12">
                  <h4 className="text-center">Suggested</h4>
                </div>
              </div>
              <div className="row">
				  {
              (suggestions && suggestions.length >= 1) ?
					  	suggestions && suggestions.map(s => (
							    <ResourceItem full={true} openResource={this.openResource} resource={s} apply={this.applyResource} />
						))
                  :
                  <div className="col-12 text-center" style={{height: "200px"}}>
                    <h1>There are no Suggested Resources for you</h1>
                  </div>
                  }
              </div>
              <div className="row">
                <div className="col-12 text-center">
                  <button className="btn btn-secondary btn-lg" onClick={() => this.props.history.push("/resources")}>Explore</button>
                </div>
              </div>
              <div className="row">
                <br />
              </div>
              <div className="row">
                <br />
              </div>
              <div className="row">
                <div className="col-12">
                  <h4 className="text-center">My Applications</h4>
                </div>
              </div>
              <div className="row">
                  {
                      (applications && applications.length >= 1) ?
                          applications && applications.map(d => (
                              <AppItem size={4} created={d.dateCreated} user={d.user} appId={d._id} openResource={this.openResource} resource={d.resource} deleteApp={this.deleteApplication} status={d.status} />
                          ))
                          :
                          <div className="col-12 text-center">
                            <h1>You have no applications open</h1>
                          </div>
                  }
              </div>
              {this.state.appModal && <YouthModal open={this.state.appModal} applying={true} toggle={this.toggleAppModal}/>}
              {this.state.resource && <ResourceModal open={this.state.resourceModal} toggle={this.toggleResource} resource={this.state.resource} user={this.state.user} created={this.state.created} status={this.state.status} toggleResponse={this.toggleResponse} /> }
              {this.state.userModal && <UserEditFormModal open={this.state.userModal} toggle={this.toggleUserModal} edit={this.editUserInfo} user={user} />}
              </div>
        );
    }
}

const DashboardPage = connect(state => ({
    resources: state.resources,
	  suggestions: state.dashboard && state.dashboard.suggestions,
    applications: (state.dashboard && state.dashboard.user) ? state.dashboard.user.applications : [],
	  user: state.user
}))(Dashboard);
export default DashboardPage;
