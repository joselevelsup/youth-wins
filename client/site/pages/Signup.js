import React, { Component } from 'react'

import { Progress } from 'reactstrap'
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
		this.prevStep = this.prevStep.bind(this)
	}

	nextStep(){
		this.state.currentStep < 3 ? 	
			this.setState({ currentStep: this.state.currentStep + 1 })
		: 
			null
	}

	prevStep(){
		this.state.currentStep > 0 ? 	
			this.setState({ currentStep: this.state.currentStep - 1 })
		: 
			null
	}

	render(){
		const helperFunctions = {
			nextStep: this.nextStep,
			prevStep: this.prevStep,
			handleChange: this.handleChange
		}

		const steps = [
			<StepOne {...helperFunctions} />,
			<StepTwo {...helperFunctions} />,
			<StepThree {...helperFunctions} />,
			<StepFour {...helperFunctions} />
		]

		return (
			<div className="signup-container">
				<div className="progress-container"><p>Signup</p><Progress className="signup-progress" color="warning" value={this.state.currentStep * 25}/></div>
				{steps[this.state.currentStep]}
			</div>
		)
	}
}
export default Signup