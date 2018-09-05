import React from "react";
import Dropzone from "react-dropzone";
import "./dropzone.scss";


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
        let dropZoneRef;
        return (
            <div className={className}>
              <Dropzone ref={(node) => { dropZoneRef = node}} {...input} disableClick multiple={false} onDrop={this.handleChange} className="dropzone" />
              <button className="btn btn-primary rounded-circle" onClick={(e) => { e.preventDefault(); dropZoneRef.open()}}>+</button>
            </div>
        )
    }
}
