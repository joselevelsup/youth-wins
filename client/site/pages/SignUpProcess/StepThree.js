import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap'
import { ethnicity } from "../../constants/ethnicity";

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
              {
                  ethnicity.map(e => (
                      <option value={e}>{e}</option>
                  ))
              }
						</Field>
					</FormGroup>
					<FormGroup tag="fieldset">
						<Label>Are you in the military?</Label>
						<FormGroup check>
							<Label check>
							<Field component="input" type="radio" value="true" name="inMilitary" />{' '}
								Yes
							</Label>
							<br/>
							<Label check>
							<Field component="input" type="radio" value="false" name="inMilitary" />{' '}
								No
							</Label>
						</FormGroup>
					</FormGroup>
					<section className="signup-button-container">
						<Button color="warning" onClick={this.props.prevStep}>Back</Button>
						<Button color="warning" onClick={this.props.nextStep}>Proceed</Button>
					</section>
				</Form>
			</div>
		)
	}
}

const StepThreeForm = reduxForm({form: 'signup', destroyOnUnmount: false, forceUnregisteredOnUnmount: true})(StepThree)
export default StepThreeForm
