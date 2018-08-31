import React from "react";
import Dropzone from "react-dropzone";

export default class DropzoneInput extends React.Component{
    constructor(){
        super();

        this.handleChange = this.handleChange.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
    }

    handleChange(files){
        const { input } = this.props;

        input.onChange(files);
    }

    handleBlur(){
        const { input } = this.props;

        input.onBlur(input.value);
    }

    render(){
        const { input, className } = this.props;
        return (
                <Dropzone {...input}  onDrop={this.handleChange} />
        )
    }
}
