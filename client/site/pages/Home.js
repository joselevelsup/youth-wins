import React, { Component } from 'react'
import { connect } from "react-redux";
import Login from './Login';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookF, faTwitter, faLinkedinIn } from '@fortawesome/free-brands-svg-icons'
import { Button } from 'reactstrap'
import { Link } from 'react-router-dom'

class HomePage extends Component {
	  render(){
        const { home } = this.props;
		return (
			  <div>
          {
              home &&
                  <React.Fragment>
				            <figure>
					            <img className="support-img home-image" src='https://www.quirkybyte.com/wp-content/uploads/2017/08/FRIENDSHIP.jpg'/>
					            <div className="button-container">
						            <Link to="/login"><Button color="warning" size="lg">Login</Button></Link>
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

const Home = connect(state => ({
    home: (state.content && state.content.content) ? state.content.content.home : []
}))(HomePage)

export default Home;
