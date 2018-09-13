import React from "react";
import { connect } from "react-redux";
import {
    Container,
    TabContent,
    TabPane,
    Nav,
    NavItem,
    NavLink,
    Card,
    Button,
    CardTitle,
    CardText,
    Row,
    Col
} from 'reactstrap';
import {
    UsersTab,
    ResourcesTab,
    ApplicationsTab,
    SettingsTab
} from "./tabs";

import {
    getAllApplications,
    getAllUsers,
    getAllResources,
    getEditableContent
} from "../../actions/admin";


class AdminPanel extends React.Component {

    constructor(props) {
        super(props);

        this.toggleTab = this.toggleTab.bind(this);
        this.state = {
            activeTab: '1'
        };
    }

    toggleTab(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    render(){
        const { user } = this.props;
        return (
              <Container>
                <Row>
                  <br />
                </Row>
                <Row>
                  <div className="col-md-8" style={{padding: 0}}>
                    <Nav tabs>
                      <NavItem>
                        <NavLink
                          className={this.state.activeTab === '1' ? "active": null}
                          onClick={() => { this.toggleTab('1'); }}
                        >
                          Resources
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={this.state.activeTab === '2' ? "active": null}
                          onClick={() => { this.toggleTab('2'); }}
                        >
                          Users
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={this.state.activeTab === '3' ? "active": null}
                          onClick={() => { this.toggleTab('3'); }}
                        >
                          Applications
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={this.state.activeTab === '4' ? "active": null}
                          onClick={() => { this.toggleTab('4'); }}
                        >
                          Settings
                        </NavLink>
                      </NavItem>
                    </Nav>
                  </div>

                  <div className="col-md-4 underline" style={{padding: 0}}>
                    {
                        user &&
                            <h4>Welcome {user.firstName} {user.lastName}</h4>
                    }
                  </div>
                </Row>
                <br />
                <TabContent activeTab={this.state.activeTab}>
                    <TabPane tabId="1">
                        <ResourcesTab  />
                    </TabPane>
                    <TabPane tabId="2">
                        <UsersTab />
                    </TabPane>
                  <TabPane tabId="3">
                    <ApplicationsTab />
                  </TabPane>
                  <TabPane tabId="4">
                    <SettingsTab />
                  </TabPane>
                </TabContent>
              </Container>
        );
    }
}

export default connect(state => ({
    user: state.user
}))(AdminPanel);
