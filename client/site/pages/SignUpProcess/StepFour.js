import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { withRouter } from 'react-router-dom'
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap'
// import { signUp } from './../../../store/reducers/user'
import { signUp } from '../../actions/auth'
import SelectField from "../../components/multi-select";


const validate = values => {
    const errors = {};

    if(!values.income){
        errors.income = "required"; 
    }

    if(!values.educationLevel){
        errors.educationLevel = "required";
    }

    if(!values.categories){
        errors.categories = "required";
    }

    return errors;
}

class StepFour extends Component {
	constructor(){
		super()
		this.signup = this.signup.bind(this)
	}

	  signup(values){
        console.log(values);
		const submission = Object.assign({}, values)
		this.props.dispatch(signUp(submission))
		this.props.history.push('/dashboard')
	}

	render(){
		  const { handleSubmit, categories } = this.props
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
					<FormGroup>
            <Field component={SelectField} name="categories" options={categories.map(c => ({ label: c, value: c}))} />
					</FormGroup>
					<br/>
					<section className="signup-button-container">
						<Button color="warning" onClick={this.props.prevStep}>Back</Button>
						<Button color="warning" disabled={this.props.invalid} onClick={handleSubmit(this.signup)}>Proceed</Button>
					</section>
				</Form>
			</div>
		)
	}
}

const mapStateToProps = state => ({
    categories: (state.content && state.content.content) ? state.content.content.categories : []
});


const mapDispatchToProps = dispatch => {
	return {
		signUp: (form) => {
			dispatch(signUp(form))
		}
	}
}

const StepFourForm = reduxForm({
    form: 'signup',
    validate,
    destroyOnUnmount: false,
    forceUnregisteredOnUnmount: true})(connect(mapStateToProps, mapDispatchToProps)(withRouter(StepFour)))
export default StepFourForm
