import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap'

export default class StepThree extends Component {
	render(){
		return (
			<div>
				<h1>Signup - Step 3</h1>
				<Form>
					<FormGroup>
						<Label>Age</Label>
						<Input name="age" onChange={this.props.handleChange}/>
					</FormGroup>
					<FormGroup>
						<Label>Ethnicity</Label>
						<Input type="select" name="ethnicity" onChange={this.props.handleChange} id="exampleSelect">
							<option>- Select Ethnicity -</option>
							<option>Ethnicity 1</option>
							<option>Ethnicity 2</option>
							<option>Ethnicity 3</option>
							<option>Ethnicity 4</option>
							<option>Ethnicity 5</option>
						</Input>
					</FormGroup>
					<FormGroup tag="fieldset">
						<Label>Are you latino/a?</Label>
						<FormGroup check>
							<Label check>
							<Input type="radio" name="isLatino" value={true} onChange={this.props.handleChange} />{' '}
								Yes
							</Label>
						</FormGroup>
						<FormGroup check>
							<Label check>
							<Input type="radio" name="isLatino" value={false} onChange={this.props.handleChange} />{' '}
								No
							</Label>
						</FormGroup>
					</FormGroup>
					<FormGroup tag="fieldset">
						<Label>Are you in the military?</Label>
						<FormGroup check>
							<Label check>
							<Input type="radio" value={true} name="inMilitary" onChange={this.props.handleChange}/>{' '}
								Yes
							</Label>
						</FormGroup>
						<FormGroup check>
							<Label check>
							<Input type="radio" value={false} name="inMilitary" onChange={this.props.handleChange}/>{' '}
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
