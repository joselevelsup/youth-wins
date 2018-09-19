import React, { Component } from 'react'
import { connect } from "react-redux";
import BecomeResource from '../components/BecomeResource';

class Support extends Component {
	  render(){
        console.log(this.props);
        const { co: { content } } = this.props;
		    return (
            <div>
              {
                  (content && content.supportUs) &&
                      <React.Fragment>
				                <header>
									<div>
					                	<img className="support-img" src='https://www.quirkybyte.com/wp-content/uploads/2017/08/FRIENDSHIP.jpg'/>
									</div>
				                </header><br />
				                <section className="support-text">
					                <h1>{content.supportUs.section1.titleText}</h1>
					                <p className="support-text-items">
                            {content.supportUs.section1.body}
					                </p><br />
					                <h1>{content.supportUs.section2.titleText}</h1>
					                <p className="support-text-items">
                            {content.supportUs.section2.body}
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
    co: state.content
}))(Support)

export default SupportUs;
