import React, { Component } from 'react'

import StepOne from './SignUpProcess/StepOne'
import StepTwo from './SignUpProcess/StepTwo'
import StepThree from './SignUpProcess/StepThree'
import StepFour from './SignUpProcess/StepFour'

class Signup extends Component {
	constructor(){
		super()
		this.state = {
			currentStep: 0
		}
		this.nextStep = this.nextStep.bind(this)
	}

	nextStep(){
		this.state.currentStep < 3 ? 	
			this.setState({ currentStep: this.state.currentStep + 1 })
		: 
			null
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

		return (
			<div>
				{/* <button onClick={this.nextStep}>Next</button> */}
				{steps[this.state.currentStep]}
			</div>
		)
	}
}
export default Signup