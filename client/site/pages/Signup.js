import React, { Component } from 'react'
import { connect } from 'react-redux'
import { signUp } from './../../store/reducers/user'

import StepOne from './SignUpProcess/StepOne'
import StepTwo from './SignUpProcess/StepTwo'
import StepThree from './SignUpProcess/StepThree'
import StepFour from './SignUpProcess/StepFour'

class Signup extends Component {
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
			inMilitary: false,
			income: '',
			educationLevel: '',
			categoriesOfInterest: []
		}
		this.nextStep = this.nextStep.bind(this)
		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
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

	handleSubmit(e){
		e.preventDefault()
		const form = Object.assign({}, this.state, {
			age: Number(this.state.age),
			zipCode: Number(this.state.zipCode),
			income: Number(this.state.income)
		})

		
		this.props.signUp(form)
		this.props.history.push('/home')
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
			<StepFour {...helperFunctions} handleSubmit={this.handleSubmit}/>
		]

		return (
			<div>
				{/* <button onClick={this.nextStep}>Next</button> */}
				{steps[this.state.currentStep]}
			</div>
		)
	}
}

// const mapStateToProps = state => state.user
const mapDispatchToProps = dispatch => {
	return {
		signUp: (form) => {
			dispatch(signUp(form))
		}
	}
}

const SignUpProcess = connect(null, mapDispatchToProps)(Signup)
export default SignUpProcess