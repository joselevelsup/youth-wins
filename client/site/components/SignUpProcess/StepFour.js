import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap'

class StepFour extends Component {
	render(){
		return (
			<div>	
				<h1>Signup - Step 4</h1>
				<Form>
					<FormGroup>
						<Label>Income</Label>
						<Input name="income" onChange={this.props.handleChange}/>
					</FormGroup>
					<FormGroup>
						<Label>Education Level</Label>
						<Input type="select" name="educationLevel" onChange={this.props.handleChange}>
							<option>- Select Education Level -</option>
							<option>Level 1</option>
							<option>Level 2</option>
							<option>Level 3</option>
							<option>Level 4</option>
							<option>Level 5</option>
						</Input>
					</FormGroup>
					<Label>What are you interested in?</Label>
					<FormGroup check>
						<Label check>
							<Input type="checkbox" name="Category 1" onChange={this.props.handleChange}/>{' '}
							Category 1
						</Label>
						<Label check>
							<Input type="checkbox" name="Category 2" onChange={this.props.handleChange}/>{' '}
							Category 2
						</Label>
					</FormGroup>
				</Form>
				<Button color="warning" onClick={this.props.handleSubmit}>Continue</Button>
			</div>
		)
	}
}

const StepFourForm = reduxForm({form: 'signup'})(StepFour)
export default StepFourForm