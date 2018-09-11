import React from "react";
import { connect } from "react-redux";
import { getUserInfo, getUserSuggested } from "../../actions/dashboard";
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

        this.openResource = this.openResource.bind(this);
		this.toggleResource = this.toggleResource.bind(this);
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

    componentDidMount(){
        this.props.dispatch(getUserInfo());
        this.props.dispatch(getUserSuggested());
    }

    openResource(r, stat){
        this.setState({
            resource: r,
            status: stat,
            resourceModal: true
        });
    }

    toggleResource(){
        this.setState({
            resourceModal: !this.state.resourceModal
        });
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
							<AppItem openResource={this.openResource} resource={d.resource} status={d.status} />
						))
                          :
                          <React.Fragment/>
                  }
              </div>
              <ResourceModal open={this.state.resourceModal} toggle={this.toggleResource} resource={this.state.resource} status={this.state.status} />
            </div>
        );
    }
}

const DashboardPage = connect(state => ({
	dashboard: state.dashboard,
	user: state.user
}))(Dashboard);
export default DashboardPage;
