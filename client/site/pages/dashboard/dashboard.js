import React from "react";
import { connect } from "react-redux";
import { getUserInfo, getUserSuggested } from "../../actions/dashboard";
import { AppItem } from "../../components/items";
import "./dashboard.scss";

class Dashboard extends React.Component{
    constructor(){
        super();
    }

    componentDidMount(){
        this.props.dispatch(getUserInfo());
        // this.props.dispatch(getUserSuggested());
    }

    render(){
        const { dashboard } = this.props;
        console.log(dashboard);
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
                              <AppItem resource={d.resource} status={d.status} />
                          ))
                          :
                          <React.Fragment/>
                  }
              </div>
            </div>
        );
    }
}

const DashboardPage = connect(state => ({
    dashboard: state.dashboard
}))(Dashboard);
export default DashboardPage;
