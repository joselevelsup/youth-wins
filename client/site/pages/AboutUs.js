import React, { Component } from 'react'
import { connect } from "react-redux";
import TeamCarousel from '../components/TeamCarousel'

class About extends Component {
	  render(){
        const { ab: { content } } = this.props;
		return (
			  <div>
          {
              (content && content.aboutUs) &&
                  <React.Fragment>
				            <header>
								<div className="support-img-container"/>
					            <img className="support-img" src='https://www.quirkybyte.com/wp-content/uploads/2017/08/FRIENDSHIP.jpg'/>
				            </header><br />
				            <section className="support-text">
					            <h1>{content.aboutUs.section1.titleText}</h1>
					            <p className="support-text-items">
                        {content.aboutUs.section1.body}
					            </p><br />
					            <h1>{content.aboutUs.section2.titleText}</h1>
					            <p className="support-text-items">
                        {content.aboutUs.section2.body}
					            </p><br />
				            </section>
				            <TeamCarousel team={content.team} />
                  </React.Fragment>
          }
			</div>
		)
	}
}

const AboutUs = connect(state => ({
    ab: state.content
}))(About)

export default AboutUs;
