import React from "react";
import { connect } from "react-redux";
import { getUserInfo, getUserSuggested, toggleResponse } from "../../actions/dashboard";
import { ResourceModal } from "../../components/modal";
import { AppItem } from "../../components/items";
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
    }

    loadUserInfo(){
        this.props.dispatch(getUserInfo());
    }

    componentDidMount(){
        this.loadUserInfo();
        // this.props.dispatch(getUserSuggested());
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
        const { dashboard } = this.props;
        return(
            <div className="container dashboard">
              <div className="row">
                <div className="col-12">
                  <h4 className="text-center">Suggested</h4>
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
    dashboard: state.dashboard
}))(Dashboard);
export default DashboardPage;
