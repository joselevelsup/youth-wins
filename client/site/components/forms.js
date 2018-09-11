import React from "react";

export class Select extends React.Component{

    constructor(){
        super();

        this.handleChange = this.handleChange.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
    }

    handleChange(val){
        const { input } = this.props;
        input.onChange(val);
    }

    handleBlur(){
        const { input, value } = this.props;
        input.onBlur(value)
    }

    render(){
        const { input, children, className } = this.props;
        return (
            <select onChange={this.handleChange} className={className} onBlur={this.handleBlur} {...input}>
              {children}
            </select>
        );
    }
}
