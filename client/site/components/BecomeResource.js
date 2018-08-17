import React, { Component, createRef } from 'react'
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap'

export default class BecomeResource extends Component {
	constructor(){
		super()
		this.state = {
			name: '',
			email: '',
			website: '',
			contactEmail: '', 
			description: '',
			logo: '',
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
		console.log(this.state)
		return (
			<main className="form-wrap">
				<Form className="support-form">
					<FormGroup className="support-form-items">
						<Label>Name</Label>
						<Input name="name" onChange={this.handleChange}/>
					</FormGroup>
					<FormGroup className="support-form-items">
						<Label>Email</Label>
						<Input name="email" onChange={this.handleChange}/>
					</FormGroup>
					<FormGroup className="support-form-items">
						<Label>Website</Label>
						<Input name="website" onChange={this.handleChange}/>
					</FormGroup>
					<FormGroup className="support-form-items">
						<Label>Contact Email</Label>
						<Input name="contactEmail" onChange={this.handleChange}/>
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
					<Button color="warning" onClick={this.props.nextStep}>Proceed to Intake</Button>
				</Form>
			</main>
		)
	}
}