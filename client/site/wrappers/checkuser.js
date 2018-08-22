import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { getCurrentUser } from "../actions/auth";

export default (WComponent) => {
    class Checkuser extends React.Component{
        constructor(){
            super();
            this.state = {
                auth: true,
                redirect: false
            };
        }

        componentDidMount(){
            this.props.dispatch(getCurrentUser()).catch(err => {
                this.setState({
                    auth: false,
                    redirect: true
                });
            })
        }

        render(){
            return (
                <div>
                    {
                        this.state.auth ?
                        <WComponent {...this.props} />
                        :
                        <React.Fragment>
                            {
                                this.state.redirect &&
                                <Redirect to="/" />
                            }
                        </React.Fragment>
                    }
                </div>
            );
        }
    }

    return connect()(Checkuser);
}
