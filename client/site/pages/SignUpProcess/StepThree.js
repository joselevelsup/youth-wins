import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap'

class StepThree extends Component {
	render(){
		return (
			<div>
				<h1>Signup - Step 3</h1>
				<Form>
					<FormGroup>
						<Label>Age</Label>
						<Field className="form-control" component="input" name="age" />
					</FormGroup>
					<FormGroup>
						<Label>Ethnicity</Label>
						<Field className="form-control" component="select" name="ethnicity"  id="exampleSelect">
							<option>- Select Ethnicity -</option>
							<option>Ethnicity 1</option>
							<option>Ethnicity 2</option>
							<option>Ethnicity 3</option>
							<option>Ethnicity 4</option>
							<option>Ethnicity 5</option>
						</Field>
					</FormGroup>
					<FormGroup tag="fieldset">
						<Label>Are you latino/a?</Label>
						<FormGroup check>
							<Label check>
							<Field component="input" type="radio" value="true" name="isLatino" />{' '}
								Yes
							</Label>
							<Label check>
							<Input component="input" type="radio" value="false" name="isLatino"  />{' '}
								No
							</Label>
						</FormGroup>
					</FormGroup>
					<FormGroup tag="fieldset">
						<Label>Are you in the military?</Label>
						<FormGroup check>
							<Label check>
							<Field component="input" type="radio" value="true" name="inMilitary" />{' '}
								Yes
							</Label>
							<Label check>
							<Field component="input" type="radio" value="false" name="inMilitary" />{' '}
								No
							</Label>
						</FormGroup>
					</FormGroup>
					<Button color="warning" onClick={this.props.nextStep}>Proceed</Button>
				</Form>
			</div>
		)
	}
}

const StepThreeForm = reduxForm({form: 'signup', destroyOnUnmount: false, forceUnregisteredOnUnmount: true})(StepThree)
export default StepThreeForm