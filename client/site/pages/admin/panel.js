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
import { getAllResources, getAllUsers } from "../../actions/admin";
import { UsersTab, ResourcesTab } from "./tabs";


class AdminPanel extends React.Component {

    constructor(props) {
        super(props);

        this.toggleTab = this.toggleTab.bind(this);
        this.state = {
            activeTab: '1',
            resModal: false
        };
    }

    toggleTab(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    componentDidMount(){
        this.props.dispatch(getAllResources());
        this.props.dispatch(getAllUsers());
    }

    render(){
        const { resources } = this.props;
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
                </Nav>
                <TabContent activeTab={this.state.activeTab}>
                    <TabPane tabId="1">
                        <ResourcesTab pending={resources.pending} approved={resources.approved} />
                    </TabPane>
                    <TabPane tabId="2">
                        <UsersTab />
                    </TabPane>
                </TabContent>
            </Container>
        );
    }
}

function mapStateToProps(state){
    return {
        resources: state.adminResources,
        users: state.adminUsers
    };
}

export default connect(mapStateToProps)(AdminPanel);
