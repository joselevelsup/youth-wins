import React, { Component } from 'react'
import { Field, reduxForm, formValues } from 'redux-form'
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { validate, asyncValidate } from "./validation";

const renderUserEmail = ({ input, label, type, placeholder, meta: { asyncValidating, touched, error }}) => (
    <React.Fragment>
      <Label>{label}</Label>
      <input className="form-control" type={type} placeholder={placeholder} {...input}/>
      {touched && error && <div className="errorField"><span>{error}</span></div>}
    </React.Fragment>
);

class StepOne extends Component {
	constructor(){
		super()
		this.state = {
			password: '',
			different: false
		}
		this.confirmPassword = this.confirmPassword.bind(this)
		this.handleChange = this.handleChange.bind(this)
	}

	handleChange(e){
		this.setState({
			password: e.target.value
		})
	}

	confirmPassword(next){	
		if(this.props.password === this.state.password) next()
		else this.setState({different: true})
	}

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
						<Field component={renderUserEmail} label="Email" type="email" name="email" placeholder="jodydoe@mail.com" />
					</FormGroup>
					<FormGroup>
						<Label>Password</Label>
						<Field className="form-control" component="input" type="password" name="password"  placeholder="********" required/>
					</FormGroup>
					<FormGroup>
						<Label>Confirm Password</Label>
						<Input className={this.state.different ? "button-danger" : null} type="password" placeholder="********" onChange={this.handleChange} required/>
					</FormGroup>
					<section className="first-button">
						<Button color="warning" disabled={this.props.invalid} onClick={() => this.confirmPassword(this.props.nextStep)}>Proceed</Button>
					</section>
				</Form>
			</div>
		)
	}
}

const StepOneForm = reduxForm({
    form: 'signup',
    validate,
    asyncValidate,
    destroyOnUnmount: false,
    forceUnregisteredOnUnmount: true,
    asyncBlurFields: ["email"]
})(formValues('password')(StepOne))
export default StepOneForm
