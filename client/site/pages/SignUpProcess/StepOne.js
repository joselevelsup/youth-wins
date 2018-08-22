import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap'

class StepOne extends Component {
	render(){
		return (
			<div>
				<h1>Signup - Step 1</h1>
				<Form>
					<FormGroup>
						<Label>First Name</Label>
						<Field className="form-control" component="input" name="firstName" placeholder="Jody" />
					</FormGroup>
					<FormGroup>
						<Label>Last Name</Label>
						<Field className="form-control" component="input" name="lastName" placeholder="Doe" />
					</FormGroup>
					<FormGroup>
						<Label>Email</Label>
						<Field className="form-control" component="input" type="email" name="email" placeholder="jodydoe@mail.com" />
					</FormGroup>
					<FormGroup>
						<Label>Password</Label>
						<Field className="form-control" component="input" type="password" name="password"  placeholder="********" />
					</FormGroup>
					<Button color="warning" onClick={this.props.nextStep}>Proceed</Button>
				</Form>
			</div>
		)
	}
}

const StepOneForm = reduxForm({form: 'signup', destroyOnUnmount: false, forceUnregisteredOnUnmount: true})(StepOne)
export default StepOneForm
