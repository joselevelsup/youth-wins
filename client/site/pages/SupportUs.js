import React, { Component } from 'react'
import BecomeResource from '../components/BecomeResource'

export default class SupportUs extends Component {
	render(){
		return (
			<div>
				<header>
					<img className="support-img" src='https://www.quirkybyte.com/wp-content/uploads/2017/08/FRIENDSHIP.jpg'/>
				</header><br />
				<section className="support-text">
					<h1>Donate</h1>
					<p className="support-text-items">
					Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
					</p><br />
					<h1>Become a Resource</h1>
					<p className="support-text-items">
					Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
					</p><br />
				</section>
				<BecomeResource />
			</div>
		)
	}
}

