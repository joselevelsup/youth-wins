import React, { Component, createRef } from 'react'
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap'
import { createResource } from '../actions/resource'

export default class BecomeResource extends Component {
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

	render(){
		return (
			<main className="form-wrap">
				<Form className="support-form">
					<FormGroup className="support-form-items">
						<Label>Name</Label>
						<Input name="organizationName" onChange={this.handleChange}/>
					</FormGroup>
					<FormGroup className="support-form-items">
						<Label>Email</Label>
						<Input name="contactEmail" onChange={this.handleChange}/>
					</FormGroup>
					<FormGroup className="support-form-items">
						<Label>Website</Label>
						<Input name="website" onChange={this.handleChange}/>
					</FormGroup>
					<FormGroup className="support-form-items">
						<Label>Ethnicities Served</Label>
						<Input name="ethnicityServed" onChange={this.handleChange}/>
					</FormGroup>
					<FormGroup className="support-form-items">
						<Label>State served</Label>
						<Input name="stateServed" onChange={this.handleChange}/>
					</FormGroup>
					<FormGroup className="support-form-items">
						<Label>Categories</Label>
						<Input name="categories" onChange={this.handleChange}/>
					</FormGroup>
					<FormGroup className="support-form-items">
						<Label>Description</Label>
						<Input className="tallInput" name="description" onChange={this.handleChange}/>
					</FormGroup>
					<FormGroup className="support-form-items">
						<Label>Logo</Label><br/>
						<div className="tallInput resourceUploadImage">
							<Button className="uploadButton" color="warning" onClick={this.fileUpload}>+</Button>
						</div>						
						<input ref={e => this.uploader = e} className="fileHidden" name="logo" type="file"/>
					</FormGroup>
					<Button color="warning" onClick={() => {}}>Proceed to Intake</Button>
				</Form>
			</main>
		)
	}
}