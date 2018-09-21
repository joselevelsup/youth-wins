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
	}

	  createChildren() {
        const { team } = this.props;
        console.log(team);
		    return 
	}
  	changeActiveItem(activeItemIndex){this.setState({ activeItemIndex })}

	render(){
		const {
			activeItemIndex,
			children,
		} = this.state;
      const { team } = this.props;


		return (
			<div>
				<div className="backgroundBlock">
					<h2>Our Team</h2>
				</div>
					<div className="home-footer">
						<ItemsCarousel
			
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
              {
                  team.map((t, i) => (
                      <div key={i} className="carouselItem">
			                  <img className="carouselImg" src={t.profile}/>
			                  <h3>{t.firstName} {t.lastName}</h3>
			                  <p>{t.description} </p>
			                  <br/>
		                  </div>))
              }
						</ItemsCarousel>
						<br/><br/>
					</div>
				<div className="backgroundBlock"></div>
			</div>
		)
	}
}
