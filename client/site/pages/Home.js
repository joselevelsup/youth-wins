import React, { Component } from 'react'
import Login from './Login';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookF, faTwitter, faLinkedinIn } from '@fortawesome/free-brands-svg-icons'
import { Link } from 'react-router-dom'
import { logIn } from '../actions/auth'
import { Field, reduxForm } from 'redux-form'
import { Button, FormGroup, Label } from 'reactstrap'
import { connect } from 'react-redux'
import { getContent } from "../actions/auth";

class Home extends Component {
	constructor(){
		super()
		this.loginUser = this.loginUser.bind(this)
	}

    componentDidMount(){
        this.props.dispatch(getContent());
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
				{
            home &&
                <React.Fragment>
				          <figure>
					          <img className="support-img home-image" src={home.bannerImage}/>
					          <div className="home-login">
						          <img className="home-logo" src={home.logoImage}/>
						          <form>
							          <FormGroup>
								          <Label>Email</Label>
								          <Field className="form-control" component="input" name="email" type="email" placeholder="jodydoe@mail.com" />
							          </FormGroup>
							          <FormGroup>
								          <Label>Password</Label>
								          <Field className="form-control" component="input" type="password" name="password" placeholder="********"/>
							          </FormGroup>

                        <Link className="forgot-link" to="/forgot">Forgot your Password?</Link>
						          </form>
					          </div>
					          <div className="button-container">
						          <Button color="warning" size="lg" onClick={handleSubmit(this.loginUser)}>Login</Button>
						          <Link to="/signup"><Button color="warning" size="lg">Signup</Button></Link>
					          </div>
				          </figure>
				          <section className="foot-container home-footer">
					          <br/><br/>
					          <h1>{home.titleText}</h1>
					          <article className="home-text">
						          <p>{home.body}</p>
					          </article>
					          <div className="social-icons">
						          <a href={home.facebook}><FontAwesomeIcon icon={faFacebookF} size='2x'/></a>
						          <a href={home.twitter}><FontAwesomeIcon icon={faTwitter} size='2x'/></a>
						          <a href={home.linkedin}><FontAwesomeIcon icon={faLinkedinIn} size='2x'/></a>
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

