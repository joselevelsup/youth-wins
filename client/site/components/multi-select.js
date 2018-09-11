import React from "react";
import Select from "react-select";
import "react-select/dist/react-select.css";

export default class SelectField extends React.Component{
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
        const { input } = this.props;

        input.onBlur(input.value);
    }

    render(){
        const { input, options, className } = this.props;
        return (
            <Select
                {...input}
                multi={true}
                simpleValue
                delimiter=" ---- "
                placeholder="select from the following menu"
                value={input.value}
                onChange={this.handleChange}
                onBlur={this.handleBlur}
                options={options}
                searchable={false}
                className={className}
            />
        );
    }
}
