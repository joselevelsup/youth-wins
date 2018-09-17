import React, { Component } from 'react'
import Login from './Login';
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
          if(data.isStaff){
			        this.props.history.push('/admin');
          } else {
              this.props.history.push("/dashboard");
          }
		}).catch(err => {
			console.log(err);
		});
  }
	render(){
		  const { handleSubmit, home } = this.props
		return (
			<div>
				<figure>
					<div>
						<div className="support-img-container"/>
						<img className="support-img home-image" src='https://www.quirkybyte.com/wp-content/uploads/2017/08/FRIENDSHIP.jpg'/>
					</div>
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
				{
              home &&
                  <React.Fragment>
				            <section className="foot-container home-footer">
					            <br/><br/>
					            <h1>{home.titleText}</h1>
					            <article className="home-text">
						            <p>{home.body}</p>
					            </article>
					            <div className="social-icons">					
						            <button><FontAwesomeIcon icon={faFacebookF} size='2x'/></button>
						            <button><FontAwesomeIcon icon={faTwitter} size='2x'/></button>
						            <button><FontAwesomeIcon icon={faLinkedinIn} size='2x'/></button>
					            </div>
					            <br/>
				            </section>
                  </React.Fragment>
          }
			</div>
		)
	}
}

const HomeComponent = reduxForm({form: 'login', destroyOnUnmount: false, forceUnregisteredOnUnmount: true})(connect(state => ({
    home: (state.content && state.content.content) ? state.content.content.home : []
}))(Home))
export default HomeComponent

