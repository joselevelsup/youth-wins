import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap'

class StepTwo extends Component {
	render(){
		return (
			<div>
				<h1>Signup - Step 2</h1>
				<Form>
					<FormGroup>
						<Label>Adress</Label>
						<Field className="form-control" component="input" name="streetAddress" placeholder="230 East Nostrand Street" />
					</FormGroup>
					<FormGroup>
						<Label>City</Label>
						<Field className="form-control" component="input" name="city" placeholder="Brooklyn" />
					</FormGroup>
					<FormGroup>
						<Label>State</Label>
						<Field className="form-control" component="input" name="state" placeholder="NY" />
					</FormGroup>
					<FormGroup>
						<Label>Zip Code</Label>
						<Field className="form-control" component="input" name="zipCode"  placeholder="11223" />
					</FormGroup>
					<Button color="warning" onClick={this.props.nextStep}>Proceed</Button>
				</Form>
			</div>
		)
	}
}

const StepTwoForm = reduxForm({form: 'signup', destroyOnUnmount: false, forceUnregisteredOnUnmount: true})(StepTwo)
export default StepTwoForm
