import React, { Component, createRef } from 'react'
import { Button, Form, FormGroup, Label, Input, FormText, Alert } from 'reactstrap'
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import DropzoneInput from "../components/dropzone";
import SelectField from "../components/multi-select";
import { ethnicity } from "../constants/ethnicity";
import { states } from "../constants/states";
import { createResource } from '../actions/resource';

class BecomeRes extends Component {
	constructor(){
		super()
		this.state = {
			organizationName: '',
			contactEmail: '',
			website: '',
			ethnicityServed: '', 
			description: '',
			logo: '',
			categories: '',
			stateServed: ''
		}
		this.uploader = createRef()
		this.handleChange = this.handleChange.bind(this)
		this.fileUpload = this.fileUpload.bind(this)
      this.createRes = this.createRes.bind(this);
	}

	handleChange(e){
		const name = e.target.name
		const value = e.target.value

		this.setState({
			[name]: value
		})
	}

	fileUpload(e){
		e.preventDefault()
		this.uploader.click()
	}

    createRes(values, dispatch){
        dispatch(createResource(values)).then(data => {
            this.setState({
                created: true
            });
        }).catch(err => {
            console.log(err);
        });
    }

	  render(){
        const { handleSubmit } = this.props;
		    return (
            <React.Fragment>
              {
                  this.state.created &&
                      <Alert color="success">
                        Successfully created a Resource
                      </Alert>
              }
			        <main className="form-wrap">
				        <Form className="support-form" onSubmit={handleSubmit(this.createRes)}>
					        <FormGroup className="support-form-items">
						        <Label>Name</Label>
					          <Field className="form-control" name="organizationName" component="input" type="text"/>
                  </FormGroup>
					        <FormGroup className="support-form-items">
						        <Label>Email</Label>
					          <Field className="form-control" name="contactEmail" component="input" type="email"/>
					        </FormGroup>
					        <FormGroup className="support-form-items">
						        <Label>Website</Label>
					          <Field className="form-control" name="website" component="input" type="text"/>
					        </FormGroup>
					        <FormGroup className="support-form-items">
						        <Label>Ethnicities Served</Label>
                    <Field component={SelectField} name="ethnicityServed" options={ethnicity.map(e => ({ value: e, label: e}))} />
					        </FormGroup>
					        <FormGroup className="support-form-items">
						        <Label>State served</Label>
                    <Field component={SelectField} name="stateServed" options={states.map(s => ({ value: s.abbreviation, label: s.name}))} />
					        </FormGroup>
					        <FormGroup className="support-form-items">
						        <Label>Categories</Label>
					          <Field className="form-control" name="categories" component="input" type="text"/>
					        </FormGroup>
					        <FormGroup className="support-form-items">
						        <Label>Description</Label>
					          <Field className="form-control" name="description" component="textarea" rows="8" />
					        </FormGroup>
					        <FormGroup className="support-form-items">
						        <Label>Logo</Label><br/>
                    <Field component={DropzoneInput} name="logo" />
					        </FormGroup>
					        <Button color="warning" type="submit">Proceed to Intake</Button>
				        </Form>
			        </main>
            </React.Fragment>
		)
	}
}

const BecomeResourceForm = reduxForm({
    form: "becomeResource"
})(BecomeRes)

const BecomeResource = connect()(BecomeResourceForm);

export default BecomeResource;
