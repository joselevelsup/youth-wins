import React, { Component } from 'react'
import ItemsCarousel from 'react-items-carousel'

const divs = [1,2,3,4,5,6,7,8,9,10]

export default class TeamCarousel extends Component {
	constructor(){
		super()
		this.state = {
			activeItemIndex: 0
		}
		this.createChildren = this.createChildren.bind(this)
		this.changeActiveItem = this.changeActiveItem.bind(this)
	}

	componentWillMount() {
		this.setState({
		  children: [],
		  activeItemIndex: 0,
		});
	 
		setTimeout(() => {
		  this.setState({
			children: this.createChildren(20),
		  })
		}, 100);
	}

	createChildren() {
		return divs.map(i => <div key={i} className="carouselItem">
			<img className="carouselImg" src="https://pbs.twimg.com/profile_images/879995771227185152/c4vfQ_Gm_400x400.jpg"/>
			<h3>Name Here</h3>
			<p>This will be the bio </p>
			<br/>
		</div>)
	}

  	changeActiveItem(activeItemIndex){this.setState({ activeItemIndex })}

	render(){
		const {
			activeItemIndex,
			children,
		} = this.state

		console.log(children)

		return (
			<div>
				<div className="backgroundBlock">
					<h2>Our Team</h2>
				</div>
					<div className="carousel">
						<ItemsCarousel
						// Placeholder configurations
						// enablePlaceholder
						// numberOfPlaceholderItems={5}
						// minimumPlaceholderTime={1000}
						// placeholderItem={<div style={{ height: 200, background: '#900' }}>Placeholder</div>}
				
						// Carousel configurations
						numberOfCards={3}
						gutter={64}
						firstAndLastGutter={true}
						freeScrolling={false}
				
						// Active item configurations
						requestToChangeActive={this.changeActiveItem}
						activeItemIndex={activeItemIndex}
						activePosition={'center'}
				
						chevronWidth={72}
						rightChevron={'>'}
						leftChevron={'<'}
						outsideChevron={true}
						className="teamCarousel"
						>
							{children}
						</ItemsCarousel>
						<br/><br/>
					</div>
				<div className="backgroundBlock"></div>
			</div>
		)
	}
}