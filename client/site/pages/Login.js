import React, { Component } from 'react'
import { connect } from 'react-redux'
import { logIn } from '../actions/auth';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap'
import { Field, reduxForm } from 'redux-form'

class Login extends Component {
	constructor(){
		super()
		// this.state = {
		// 	email: '',
		// 	password: ''
		// }
		this.loginUser = this.loginUser.bind(this)
	}

	  loginUser(values){
		    this.props.dispatch(logIn(values)).then(data => {
            if(data.isStaff){
                this.props.history.push("/admin");
            } else {
                this.props.history.push("/dashboard");
            }
        }).catch(err => {
            console.log(err);
        });
	  }


	render(){
		const { handleSubmit } = this.props
		return (
			<div className="login-container">
				<section className="login">
					<form>
						<FormGroup>
							<Label>Email</Label>
							<Field className="form-control" component="input" name="email" type="email" placeholder="jodydoe@mail.com" />
						</FormGroup>
						<FormGroup>
							<Label>Password</Label>
							<Field className="form-control" component="input" type="password" name="password" placeholder="********"/>
						</FormGroup>
					</form>
					<Button color="warning" onClick={handleSubmit(this.loginUser)}>Login</Button>
				</section>
			</div>
		)
	}
}


const LogInComponent = reduxForm({form: 'login', destroyOnUnmount: false, forceUnregisteredOnUnmount: true})(connect()(Login))
export default LogInComponent
