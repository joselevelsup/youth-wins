import React from "react";
import { connect } from "react-redux";
import { getUserInfo, getUserSuggested, toggleResponse } from "../../actions/dashboard";
import { applyResource } from "../../actions/resource";
import { ResourceModal } from "../../components/modal";
import { AppItem, ResourceItem } from "../../components/items";
import "./dashboard.scss";

class Dashboard extends React.Component{
    constructor(){
        super();

        this.state = {
            resourceModal: false,
            resource: null,
            status: null
        };

        this.loadUserInfo = this.loadUserInfo.bind(this);
        this.openResource = this.openResource.bind(this);

        this.toggleResource = this.toggleResource.bind(this);
        this.toggleResponse = this.toggleResponse.bind(this);

		this.applyResource = this.applyResource.bind(this);
	}
	
	applyResource(resourceId){
		const self = this;
        this.props.dispatch(applyResource(resourceId)).then(data => {
           self.toggleResource();
        }).catch(err => {
            console.log(err);
        });
    }

    loadUserInfo(){
        this.props.dispatch(getUserInfo());
      this.props.dispatch(getUserSuggested());
    }

    componentDidMount(){
        this.loadUserInfo();
    }

    openResource(r, stat, id){
        this.setState({
            resource: r,
            appId: id,
            status: stat,
            resourceModal: true
        });
    }

    toggleResource(){
        this.setState({
            resourceModal: !this.state.resourceModal
        });
    }

    toggleResponse(status){
        this.props.dispatch(toggleResponse(status, this.state.appId));
        this.loadUserInfo();
    }

    render(){
		const { dashboard, user } = this.props;
        return(
            <div className="container dashboard">
				<div className="title">
					<h1 className="welcome">Welcome {user.firstName} {user.lastName}</h1>
					{user.profile ? <img className="profile-pic" src={user.profile}/> : null}
				</div>
              <div className="row">
                <div className="col-12">
                  <h4 className="text-center">Suggested</h4>
				  {
                      dashboard ?
					  	dashboard.suggestions && dashboard.suggestions.map(s => (
							<ResourceItem openResource={this.openResource} resource={s} apply={this.applyResource} />
						))
                          :
                          <React.Fragment/>
                  }
                </div>
              </div>
              <div className="row">
                  {
                      dashboard ?
                          dashboard.applications && dashboard.applications.map(d => (
                              <AppItem size={4} appId={d._id} openResource={this.openResource} resource={d.resource} status={d.status} />
                          ))
                          :
                          <React.Fragment/>
                  }
              </div>
              {this.state.resource && <ResourceModal open={this.state.resourceModal} toggle={this.toggleResource} resource={this.state.resource} status={this.state.status} toggleResponse={this.toggleResponse} /> }
            </div>
        );
    }
}

const DashboardPage = connect(state => ({
	dashboard: state.dashboard,
	user: state.user
}))(Dashboard);
export default DashboardPage;
