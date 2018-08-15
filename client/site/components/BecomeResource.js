import React, { Component } from 'react'
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
		this.handleChange = this.handleChange.bind(this)
	}

	handleChange(e){
		const name = e.target.name
		const value = e.target.value

		this.setState({
			[name]: value
		})
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
						<Input name="description" onChange={this.handleChange}/>
					</FormGroup>
					<FormGroup className="support-form-items">
						<Label>Logo</Label>
						<Input name="logo" onChange={this.handleChange}/>
					</FormGroup>
					<Button color="warning" onClick={this.props.nextStep}>Proceed to Intake</Button>
				</Form>
			</main>
		)
	}
}