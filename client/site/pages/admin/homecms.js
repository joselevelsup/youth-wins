import React from "react";
import { reduxForm, Field } from "redux-form";
import { Row, Col } from "reactstrap";
import DropzoneInput from "../../components/dropzone";

class HomeCmsForm extends React.Component{
    componentDidMount(){
        this.props.initialize(this.props.home);
    }
    render(){
        return (
                        <form onSubmit={this.props.handleSubmit(this.props.update)}>
                          <Row>
                            <Col md={6}>
                              <Row>
                                <Col md={12}>
                                  <label><h5>Banner Text</h5></label>
                                  <Field className="form-control" component="input" type="text" name="bannerText" />
                                </Col>
                              </Row>
                              <Row>
                                <Col md={12}>
                                  <label><h5>Banner Image</h5></label>
                                  <Field component={DropzoneInput} name="bannerImage" />
                                </Col>
                              </Row>
                              <Row>
                                <Col md={12}>
                                  <label><h5>Logo Image</h5></label>
                                  <Field component={DropzoneInput} name="logoImage" />
                                </Col>
                              </Row>
                              <Row>
                                <br />
                              </Row>
                              <Row>
                                <Col md={12}>
                                  <label><h5>Title Text</h5></label>
                                  <Field className="form-control" component="input" type="text" name="titleText" />
                                </Col>
                              </Row>
                              <Row>
                                <br />
                              </Row>
                              <Row>
                                <Col md={12}>
                                  <label><h5>Body Text</h5></label>
                                  <Field className="form-control" component="textarea" name="body" />
                                </Col>
                              </Row>
                              <Row>
                                <br />
                              </Row>
                            </Col>
                            <Col md={6}>
                              <Row>
                                <Col md={12}>
                                  <label><h5>Facebook Link</h5></label>
                                  <Field className="form-control" component="input" type="text" name="facebook" />
                                </Col>
                              </Row>
                              <Row>
                                <br />
                              </Row>
                              <Row>
                                <Col md={12}>
                                  <label><h5>Twitter Link</h5></label>
                                  <Field className="form-control" component="input" type="text" name="twitter" />
                                </Col>
                              </Row>
                              <Row>
                                <br />
                              </Row>
                              <Row>
                                <Col md={12}>
                                  <label><h5>LinkedIn Text</h5></label>
                                  <Field className="form-control" component="input" type="text" name="linkedin" />
                                </Col>
                              </Row>
                            </Col>
                          </Row>
                          <Row>
                            <br />
                          </Row>
                          <Row>
                            <Col md={{size: 4, offset: 4}} className="text-center">
                              <button className="btn btn-block btn-primary btn-swerve">Update</button>
                            </Col>
                          </Row>
                          <Row>
                            <br />
                          </Row>
                        </form>
        );
    }
}

export const HomeCms = reduxForm({
    form: "homeCmsForm"
})(HomeCmsForm);
