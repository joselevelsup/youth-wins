import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap'

export default class StepTwo extends Component {
	render(){
		return (
			<div>
				<h1>Signup - Step 2</h1>
				<Form>
					<FormGroup>
						<Label>Adress</Label>
						<Input name="streetAddress" onChange={this.props.handleChange} placeholder="230 East Nostrand Street" />
					</FormGroup>
					<FormGroup>
						<Label>City</Label>
						<Input name="city" onChange={this.props.handleChange} placeholder="Brooklyn" />
					</FormGroup>
					<FormGroup>
						<Label>State</Label>
						<Input name="state" onChange={this.props.handleChange} placeholder="NY" />
					</FormGroup>
					<FormGroup>
						<Label>Zip Code</Label>
						<Input name="zipCode" onChange={this.props.handleChange}  placeholder="11223" />
					</FormGroup>
					<Button color="warning" onClick={this.props.nextStep}>Proceed</Button>
				</Form>
			</div>
		)
	}
}
