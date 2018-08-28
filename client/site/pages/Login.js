import React, { Component } from 'react'
import { connect } from 'react-redux'
import { logIn } from '../actions/auth'
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap'

class Login extends Component {
	constructor(){
		super()
		this.state = {
			email: '',
			password: ''
		}
		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	handleChange(e){
		const name = e.target.name
		const value = e.target.value

		this.setState({
			[name]: value
		})
	}

	handleSubmit(e){
		e.preventDefault()
		this.props.logIn(this.state)
		this.props.history.push('/home')
	}


	render(){
		console.log(this.state)
		return (
			<div className="login-container">
				<section className="login">
					<h1>Login</h1>
					<FormGroup>
						<Label>Email</Label>
						<Input onChange={this.handleChange} type="email" name="email" placeholder="jodydoe@mail.com" />
					</FormGroup>
					<FormGroup>
						<Label>Password</Label>
						<Input onChange={this.handleChange} type="password" name="password"  placeholder="********" />
					</FormGroup>
					<Button color="warning" onClick={this.handleSubmit}>Proceed</Button>
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

const LogInComponent = connect(null, mapDispatchToProps)(Login)
export default LogInComponent
