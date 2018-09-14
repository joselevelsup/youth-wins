import React from "react";
import { connect } from "react-redux";
import { getUserInfo, getUserSuggested, toggleResponse } from "../../actions/dashboard";
import { applyResource } from "../../actions/resource";
import { YouthModal, ResourceModal } from "../../components/modal";
import { AppItem, ResourceItem } from "../../components/items";
import "./dashboard.scss";

class Dashboard extends React.Component{
    constructor(){
        super();

        this.state = {
            resourceModal: false,
            appModal: false,
            resource: null,
            status: null
        };

        this.loadUserInfo = this.loadUserInfo.bind(this);
        this.openResource = this.openResource.bind(this);

        this.toggleAppModal = this.toggleAppModal.bind(this);
        this.toggleResource = this.toggleResource.bind(this);
        this.toggleResponse = this.toggleResponse.bind(this);

		    this.applyResource = this.applyResource.bind(this);
	}
	
	applyResource(resourceId){
		const self = this;
      this.props.dispatch(applyResource(resourceId)).then(data => {
          self.toggleAppModal();
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

    toggleAppModal(){
        this.setState({
            appModal: !this.state.appModal
        });
    }

    render(){
		    const { suggestions, applications, user } = this.props;
        return(
            <div className="container dashboard">
              <div className="row">
                <br />
              </div>
				      <div className="row">
                <div className="col-2">
					        {user.profile ? <img className="img-fluid rounded-circle border-color" src={user.profile}/> : null}
                </div>
                <div className="col-8 align-self-center"> 
					        <h3 className="welcome">Welcome {user.firstName} {user.lastName}</h3>
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
                      applications ?
                          applications && applications.map(d => (
                              <AppItem size={4} user={d.user} appId={d._id} openResource={this.openResource} resource={d.resource} status={d.status} />
                          ))
                          :
                          <div className="col-12 text-center">
                            <h1>You have no applications open</h1>
                          </div>
                  }
              </div>
              {this.state.appModal && <YouthModal open={this.state.appModal} applying={true} toggle={this.toggleAppModal}/>}
              {this.state.resource && <ResourceModal open={this.state.resourceModal} toggle={this.toggleResource} resource={this.state.resource} status={this.state.status} toggleResponse={this.toggleResponse} /> }
              </div>
        );
    }
}

const DashboardPage = connect(state => ({
	  suggestions: state.dashboard && state.dashboard.suggestions,
    applications: (state.dashboard && state.dashboard.user) ? state.dashboard.user.applications : [],
	  user: state.user
}))(Dashboard);
export default DashboardPage;
