import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

export default (WComponent) => {
    class Checkadmin extends React.Component{
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
                if(user && user.isStaff){
                    this.setState({
                        auth: true,
                        redirect: false
                    });
                } else {
                    this.setState({
                        auth: false,
                        redirect: true
                    });
                }
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
    }))(Checkadmin);
}
