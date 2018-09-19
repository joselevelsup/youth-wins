import React, { Component } from 'react'
import { connect } from "react-redux";
import { getContent } from "../actions/admin";
import TeamCarousel from '../components/TeamCarousel'

class About extends Component {

    componentDidMount(){
        this.props.dispatch(getContent());
    }

	  render(){
        const { about, team } = this.props;
		return (
			  <div>
          {
              about &&
                  <React.Fragment>
				            <header>
					            <img className="support-img" src={about.bannerImage}/>
				            </header><br />
				            <section className="support-text">
					            <h1>{about.section1.titleText}</h1>
					            <p className="support-text-items">
                        {about.section1.body}
					            </p><br />
					            <h1>{about.section2.titleText}</h1>
					            <p className="support-text-items">
                        {about.section2.body}
					            </p><br />
				            </section>
				            <TeamCarousel team={team} />
                  </React.Fragment>
          }
			</div>
		)
	}
}

const AboutUs = connect(state => ({
    team: (state.content && state.content.content) ? state.content.content.team : [],
    about: (state.content && state.content.content) ? state.content.content.aboutUs : []
}))(About)

export default AboutUs;
