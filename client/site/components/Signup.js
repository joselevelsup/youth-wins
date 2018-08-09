import React, { Component } from 'react'
import StepOne from './SignUpProcess/StepOne'
import StepTwo from './SignUpProcess/StepTwo'
import StepThree from './SignUpProcess/StepThree'
import StepFour from './SignUpProcess/StepFour'

export default class Signup extends Component {
	constructor(){
		super()
		this.state = {
			currentStep: 0,
			firstName: '',
			lastName: '',
			email: '',
			password: '',
			streetAddress: '',
			city: '',
			state: '',
			zipCode: '',
			categoriesOfInterest: [],
			age: '',
			ethnicity: '',
			isLatino: false,
			isMilitary: false,
			income: '',
			educationLevel: '',
			categoriesOfInterest: []
		}
		this.nextStep = this.nextStep.bind(this)
		this.handleChange = this.handleChange.bind(this)
	}

	nextStep(){
		this.state.currentStep < 3 ? 	
			this.setState({ currentStep: this.state.currentStep + 1 })
		: 
			null
	}

	handleChange(e){
		const name = e.target.name
		const type =  e.target.type
		const value = type === 'radio' ? (e.target.value === 'true') : e.target.value

		if(type === 'checkbox'){
			const cats = this.state.categoriesOfInterest
			const categoriesOfInterest = ~cats.indexOf(name) ?
				cats.filter(cat => cat !== name) :
				[...cats, name]
			
			this.setState({
				categoriesOfInterest
			})
		}else{
			this.setState({
				[name]: value
			})
		}
	}

	render(){
		const helperFunctions = {
			nextStep: this.nextStep,
			handleChange: this.handleChange
		}

		const steps = [
			<StepOne {...helperFunctions} />,
			<StepTwo {...helperFunctions} />,
			<StepThree {...helperFunctions} />,
			<StepFour {...helperFunctions} />
		]

		console.log(this.state)
		return (
			<div>
				{/* <button onClick={this.nextStep}>Next</button> */}
				{steps[this.state.currentStep]}
			</div>
		)
	}
}
