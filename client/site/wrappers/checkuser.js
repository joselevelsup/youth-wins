import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { getCurrentUser } from "../actions/auth";

export default (WComponent) => {
    class Checkuser extends React.Component{
        constructor(){
            super();
            this.state = {};
        }
        componentDidMount(){
            const { user } = this.props;
            if(user && user.loggedIn == false){
                this.setState({
                    auth: false,
                    redirect: true
                });
            } else {
                this.setState({
                    auth: true,
                    redirect: false
                });
            }
        }

        render(){
            return (
                <div>
                    {
                        this.state.auth ?
                        <WComponent {...this.props} />
                        :
                        this.state.redirect &&
                            <Redirect to="/login" />
                    }
                </div>
            );
        }
    }

    return connect(state => ({
        user: state.user
    }))(Checkuser);
}
