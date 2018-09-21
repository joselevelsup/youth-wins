import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { withRouter } from 'react-router-dom'
import { Button, Form, FormGroup, Label, Input, FormText, Alert } from 'reactstrap'
// import { signUp } from './../../../store/reducers/user'
import { signUp } from '../../actions/auth'
import SelectField from "../../components/multi-select";
import { education } from '../../constants/education'

const validate = values => {
    const errors = {};

    if(!values.income){
        errors.income = "required"; 
    }

    if(!values.educationLevel){
        errors.educationLevel = "required";
    }

    if(!values.categories){
        errors.categories = "required";
    }

    return errors;
}

class StepFour extends Component {
	constructor(){
		  super();

      this.state = {
          errAlert: false,
          errMsg: null
      };

		  this.signup = this.signup.bind(this);

	}

	  signup(values){
		    const submission = Object.assign({}, values)
		    this.props.dispatch(signUp(submission)).then(data => {
            let params = new URLSearchParams(this.props.location.search).get("r");
            if(params){
                this.props.history.push(`/resources/?r=${params}`);
            } else {
		            this.props.history.push('/dashboard');
            }
        }).catch(err => {
            this.setState({
                errAlert: true,
                errMsg: err.response.data.message
            });
        });
	  }


	render(){
		  const { handleSubmit, categories } = this.props
		return (
			  <div>
          {
              this.state.errAlert &&
                  <Alert color="danger">{this.state.errMsg}</Alert>
          }
				<h1>Signup - Step 4</h1>
				<Form onSubmit={handleSubmit(this.signup)}>
					<FormGroup>
						<Label>Income</Label>
						<Field className="form-control" component="input" name="income" />
					</FormGroup>
					<FormGroup>
						<Label>Education Level</Label>
						<Field className="form-control" component="select" name="educationLevel" >
							<option>- Select Education Level -</option>
							{education.map(lvl => <option>{lvl}</option>)}
						</Field>
					</FormGroup>
					<Label>What are you interested in?</Label>
					<FormGroup>
            <Field component={SelectField} name="categories" options={categories.map(c => ({ label: c, value: c}))} />
					</FormGroup>
					<br/>
					<section className="signup-button-container">
						<Button color="warning" onClick={this.props.prevStep}>Back</Button>
						<Button color="warning" disabled={this.props.invalid} onClick={handleSubmit(this.signup)}>Proceed</Button>
					</section>
				</Form>
			</div>
		)
	}
}

const mapStateToProps = state => ({
    categories: (state.content && state.content.content) ? state.content.content.categories : []
});


const mapDispatchToProps = dispatch => {
	return {
		signUp: (form) => {
			dispatch(signUp(form))
		}
	}
}

const StepFourForm = reduxForm({
    form: 'signup',
    validate,
    destroyOnUnmount: false,
    forceUnregisteredOnUnmount: true})(connect(mapStateToProps, mapDispatchToProps)(withRouter(StepFour)))
export default StepFourForm
