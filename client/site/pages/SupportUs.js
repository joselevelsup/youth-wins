import React, { Component } from 'react'
import { connect } from "react-redux";
import { getContent } from "../actions/admin";
import BecomeResource from '../components/BecomeResource';

class Support extends Component {

    componentDidMount(){
        this.props.dispatch(getContent());
    }

	  render(){
        const { support } = this.props;
		    return (
            <div>
              {
                  support &&
                      <React.Fragment>
				                <header>

									<div className="support-image-container">

					                	<img className="support-img" src={support.bannerImage}/>
									        </div>
				                </header><br />
				                <section className="support-text">
					                <h1>{support.section1Title}</h1>
					                <p className="support-text-items">
                            {support.section1Body}
					                </p><br />
					                <h1>{support.section2Title}</h1>
					                <p className="support-text-items">
                            {support.section2Body}
					                </p><br />
				                </section>
                      </React.Fragment>
              }
			  <BecomeResource />
			</div>
		)
	}
}

const SupportUs = connect(state => ({
    support: (state.content && state.content.content) ? state.content.content.supportUs : []
}))(Support)

export default SupportUs;
