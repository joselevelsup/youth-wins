import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookF, faTwitter, faLinkedinIn } from '@fortawesome/free-brands-svg-icons'
import { Link } from 'react-router-dom'
import { logIn } from '../actions/auth'
import { Field, reduxForm } from 'redux-form'
import { Button, FormGroup, Label } from 'reactstrap'
import { connect } from 'react-redux'

class Home extends Component {
	constructor(){
		super()
		this.loginUser = this.loginUser.bind(this)
	}

	loginUser(values){
		this.props.dispatch(logIn(values)).then(data => {
			this.props.history.push('/home');
		}).catch(err => {
			console.log(err);
		});
  }
	render(){
		const { handleSubmit } = this.props
		console.log(this.props)
		return (
			<div>
				<figure>
					<img className="support-img home-image" src='https://www.quirkybyte.com/wp-content/uploads/2017/08/FRIENDSHIP.jpg'/>
					<div className="home-login">
						<img className="home-logo" src="https://cdn1.cloudcanvas.website/media/sites/26/2017/09/28175958/stitcher-logo-transparent.png"/>
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
					</div>
					<div className="button-container">
						<Button color="warning" size="lg" onClick={handleSubmit(this.loginUser)}>Login</Button>
						<Link to="/signup"><Button color="warning" size="lg">Signup</Button></Link>
					</div>
				</figure>
				<section className="foot-container home-footer">
					<br/><br/>
					<h1>Our Benefits</h1>
					<article className="home-text">
						<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
					</article>
					<div className="social-icons">					
						<button><FontAwesomeIcon icon={faFacebookF} size='2x'/></button>
						<button><FontAwesomeIcon icon={faTwitter} size='2x'/></button>
						<button><FontAwesomeIcon icon={faLinkedinIn} size='2x'/></button>
					</div>
					<br/>
				</section>
			</div>
		)
	}
}

const HomeComponent = reduxForm({form: 'login', destroyOnUnmount: false, forceUnregisteredOnUnmount: true})(connect()(Home))
export default HomeComponent
