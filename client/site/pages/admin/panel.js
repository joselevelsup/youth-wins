import React from "react";
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
import { UsersTab, ResourcesTab, ApplicationsTab } from "./tabs";


export default class AdminPanel extends React.Component {

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
        return (
            <Container>
                <br />
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
                </Nav>
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
                </TabContent>
            </Container>
        );
    }
}
