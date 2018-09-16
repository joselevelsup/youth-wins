import React from "react";
import { reduxForm, Field } from "redux-form";
import { Container, Row, Col, Alert, Button, FormGroup, Label } from "reactstrap";

import { sendForgotPass, changePass } from "../actions/forgot";

class Forgot extends React.Component{
    constructor(){
        super();
        this.state = {
            user: null,
            sending: true,
            passmatch: false,
            emailexists: false,
            sentEmail: false,
            changed: false
        };

        this.sendForgotPassword = this.sendForgotPassword.bind(this);
        this.changePassword = this.changePassword.bind(this);
    }

    sendForgotPassword({ forgotemail }, dispatch){
        dispatch(sendForgotPass(forgotemail)).then(data => {
            if(data.success){
                this.setState({
                    sentEmail: true,
                    emailexists: false
                });
            }
        }).catch(err => {
            console.log(err);
        });
    }

    changePassword({ newpass, cnewpass }, dispatch){
        if(newpass !== cnewpass){
            this.setState({
                passmatch: true
            });
        } else {
            dispatch(changePass(this.state.user, newpass)).then(data => {
                if(data.success){
                    this.setState({
                        passmatch: false,
                        changed: true
                    });
                }
            }).catch(err => {
                console.log(err);
            });
        }
    }

    componentDidMount(){
        const params = new URLSearchParams(this.props.location.search).get("u");
        this.setState({
            user: params
        });
        if(!params){
            this.setState({
                sending: false
            });
        }
    }

    render(){
        const { sending, passmatch, emailexists, sentEmail, changed } = this.state;
        const { handleSubmit } = this.props;
        return(
            <React.Fragment>
              {
                  sending ?
                  <Container>
                    {
                        passmatch &&
                            <Row className="pt-2">
                              <Col md={12}>
                                <Alert color="danger">The passwords do not match.</Alert>
                              </Col>
                            </Row>
                    }
                    {
                        changed &&
                        <Row className="pt-2">
                          <Col md={12}>
                            <Alert color="success">Password successfully reset.</Alert>
                          </Col>
                        </Row>
                    }
                    <form onSubmit={handleSubmit(this.changePassword)}>
                      <FormGroup>
                        <Label>New Password:</Label>
                        <Field className="form-control" component="input" name="newpass" />
                      </FormGroup>
                      <FormGroup>
                         <Label>Confirm New Password:</Label>
                        <Field className="form-control" component="input" name="cnewpass" />
                      </FormGroup>
                      <Button color="warning" type="submit">Change Password</Button>
                    </form>
                  </Container>
                  :
                  <Container>
                    {
                        emailexists &&
                            <Row className="pt-2">
                              <Col md={12}>
                                <Alert color="danger">Email does not exist</Alert>
                              </Col>
                            </Row>
                    }
                    {
                        sentEmail &&
                            <Row className="pt-2">
                              <Col md={12}>
                                <Alert color="success">Email was sent!</Alert>
                              </Col>
                            </Row>
                    }
                    <form onSubmit={handleSubmit(this.sendForgotPassword)}>
                      <FormGroup>
                        <Label>Enter your Email that is registered with Youth Wins:</Label>
                        <Field className="form-control" component="input" name="forgotemail" />
                      </FormGroup>
                      <Button color="warning" type="submit">Send Forgot Email</Button>
                    </form>
                  </Container>
              }
            </React.Fragment>
        );
    }
}

export default reduxForm({
    form: "forgot"
})(Forgot);
