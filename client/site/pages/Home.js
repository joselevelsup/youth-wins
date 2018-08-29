import React, { Component } from 'react'
import Login from './Login';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookF, faTwitter, faLinkedinIn } from '@fortawesome/free-brands-svg-icons'
import { Button } from 'reactstrap'
import { Link } from 'react-router-dom'

export default class Home extends Component {
	render(){
		return (
			<div>
				<figure>
					<img className="support-img home-image" src='https://www.quirkybyte.com/wp-content/uploads/2017/08/FRIENDSHIP.jpg'/>
					<div className="button-container">
						<Link to="/login"><Button color="warning" size="lg">Login</Button></Link>
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
