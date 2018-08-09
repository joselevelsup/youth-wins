import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap'

export default class StepOne extends Component {
	render(){

		console.log(this.props)
		return (
			<div>
				<h1>Signup - Step 1</h1>
				<Form>
					<FormGroup>
						<Label>First Name</Label>
						<Input onChange={this.props.handleChange} name="firstName" placeholder="Jody" />
					</FormGroup>
					<FormGroup>
						<Label>Last Name</Label>
						<Input onChange={this.props.handleChange} name="lastName" placeholder="Doe" />
					</FormGroup>
					<FormGroup>
						<Label>Email</Label>
						<Input onChange={this.props.handleChange} type="email" name="email" placeholder="jodydoe@mail.com" />
					</FormGroup>
					<FormGroup>
						<Label>Password</Label>
						<Input onChange={this.props.handleChange} type="password" name="password"  placeholder="********" />
					</FormGroup>
					<Button color="warning" onClick={this.props.nextStep}>Proceed</Button>
				</Form>
			</div>
		)
	}
}
