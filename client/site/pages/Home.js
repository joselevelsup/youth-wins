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
import { websiteValid } from "../components/helpers";

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
                      <div className="support-image-container">
                        <div className="white-overlay"/>
                        <img className="support-img" src='https://www.quirkybyte.com/wp-content/uploads/2017/08/FRIENDSHIP.jpg'/>
                      </div>
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
                      <div className="home-column">
					              <h1 className="home-title">{home.titleText}</h1>
						              <p className="home-text">{home.body}</p>
                      </div>
					            <div className="social-icons">
						            <a target="_blank" href={websiteValid(home.facebook) ? home.facebook : `http://${home.facebook}`}><FontAwesomeIcon icon={faFacebookF} size='2x'/></a>
						            <a target="_blank" href={websiteValid(home.twitter) ? home.twitter : `http://${home.twitter}`}><FontAwesomeIcon icon={faTwitter} size='2x'/></a>
						            <a target="_blank" href={websiteValid(home.linkedin) ? home.linkedin : `http://${home.linkedin}`}><FontAwesomeIcon icon={faLinkedinIn} size='2x'/></a>
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

