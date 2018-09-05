import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { withRouter } from 'react-router-dom'
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap'
// import { signUp } from './../../../store/reducers/user'
import { signUp } from '../../actions/auth'

class StepFour extends Component {
	constructor(){
		super()
		this.signup = this.signup.bind(this)
	}

	signup(values){
		const submission = Object.assign({}, values)
		this.props.dispatch(signUp(submission))
		this.props.history.push('/home')
	}

	render(){
		const { handleSubmit } = this.props
		return (
			<div>	
				<h1>Signup - Step 4</h1>
				<Form onSubmit={handleSubmit(this.signup)}>
					<FormGroup>
						<Label>Income</Label>
						<Field className="form-control" component="input" name="income" />
					</FormGroup>
					<FormGroup>
						<Label>Education Level</Label>
						<Field className="form-control" component="select" name="educationLevel" >
							<option>- Select Education Level -</option>
							<option>Level 1</option>
							<option>Level 2</option>
							<option>Level 3</option>
							<option>Level 4</option>
							<option>Level 5</option>
						</Field>
					</FormGroup>
					<Label>What are you interested in?</Label>
					<FormGroup check>
						<Label check>
							<Field component="input" type="checkbox" name="Category 1" />{' '}
							Category 1
						</Label>
						<br/>
						<Label check>
							<Field component="input" type="checkbox" name="Category 2" />{' '}
							Category 2
						</Label>
					</FormGroup>
					<br/>
					<Button color="warning" type="submit">Continue</Button>
				</Form>
			</div>
		)
	}
}

const mapDispatchToProps = dispatch => {
	return {
		signUp: (form) => {
			dispatch(signUp(form))
		}
	}
}

const StepFourForm = reduxForm({form: 'signup', destroyOnUnmount: false, forceUnregisteredOnUnmount: true})(connect(null, mapDispatchToProps)(withRouter(StepFour)))
export default StepFourForm
