import React from "react";
import { connect } from "react-redux";

export default (WComponent) => {
    class InjectContent extends React.Component{
        constructor(){
            super();
        }

        shouldComponentUpdate(){
            return false;
        }


        render(){
            return(
                    <WComponent {...this.props} />
            );
        }
    }

    return connect(state => ({
        content: state.content
    }))(InjectContent);

}
