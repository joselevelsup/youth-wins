import React from "react";
import { connect } from "react-redux";
import { getUserInfo, getUserSuggested } from "../../actions/dashboard";
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
		const { dashboard } = this.props;

        return(
            <div className="container dashboard">
              <div className="row">
                <div className="col-12">
                  <h4 className="text-center">Suggested</h4>
				  {
                      dashboard ?
					  	dashboard.suggestions && dashboard.suggestions.map(s => (
							<ResourceItem resource={s} />
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
    dashboard: state.dashboard
}))(Dashboard);
export default DashboardPage;
