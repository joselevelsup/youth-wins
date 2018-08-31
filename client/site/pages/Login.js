import React, { Component } from 'react'
import { connect } from 'react-redux'
import { logIn } from '../actions/auth'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap'
import { Field, reduxForm } from 'redux-form'

class Login extends Component {
	constructor(){
		super()
		this.state = {
			email: '',
			password: ''
		}
		this.login = this.login.bind(this)
	}

	login(values){
		const submission = Object.assign({}, values)
		this.props.login(submission)
		this.props.history.push('/home')
	}


	render(){
		const { handleSubmit } = this.props
		return (
			<div className="login-container">
				<section className="login">
					{this.props.title ? <h1>Login</h1> : null}
					<Form onSubmit={handleSubmit(this.login)}>
						<FormGroup>
							<Label>Email</Label>
							<Field className="form-control" component="input" name="email" type="email" placeholder="jodydoe@mail.com" />
						</FormGroup>
						<FormGroup>
							<Label>Password</Label>
							<Field className="form-control" component="input" name="password" placeholder="********"/>
						</FormGroup>
					</Form>
					<Button color="warning" onClick={this.handleSubmit}>Login</Button>
				</section>
			</div>
		)
	}
}

const mapDispatchToProps = dispatch => {
	return {
		logIn: (form) => {
			dispatch(logIn(form))
		}
	}
}

const LogInComponent = reduxForm({form: 'login', destroyOnUnmount: false, forceUnregisteredOnUnmount: true})(connect(null, mapDispatchToProps)(Login))
export default LogInComponent
