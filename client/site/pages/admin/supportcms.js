import React from "react";
import { reduxForm, Field } from "redux-form";
import { Row, Col } from "reactstrap";
import DropzoneInput from "../../components/dropzone";

class SupportCmsForm extends React.Component{

    componentDidMount(){
        this.props.initialize(this.props.support);
    }

    render(){
        return (
            <form onSubmit={this.props.handleSubmit(this.props.update)}>
              <Row>
                <Col md={{size: 4, offset: 1}}>
                  <label><h5>Banner Text</h5></label>
                  <Field className="form-control" component="input" type="text" name="bannerText" />
                </Col>
                <Col md={{size: 4, offset: 2}}>
                  <label><h5>Banner Image</h5></label>
                  <Field component={DropzoneInput} name="bannerImage" />
                </Col>
              </Row>
              <Row>
                <br />
              </Row>
              <Row>
                <Col md={6}>
                  <Row>
                    <Col md={12} className="text-center">
                      <h5>Section 1</h5>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={{size: 8, offset: 2}}>
                      <label><h5>Title Text</h5></label>
                      <Field className="form-control" component="input" type="text" name="section1Title" />
                    </Col>
                  </Row>
                  <Row>
                    <br />
                  </Row>
                  <Row>
                    <Col md={{size: 8, offset: 2}}>
                      <label><h5>Body Text</h5></label>
                      <Field className="form-control" component="textarea" name="section1Body" />
                    </Col>
                  </Row>
                </Col>

                <Col md={6}>
                  <Row>
                    <Col md={12} className="text-center">
                      <h5>Section 2</h5>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={{size: 8, offset: 2}}>
                      <label><h5>Title Text</h5></label>
                      <Field className="form-control" component="input" type="text" name="section2Title" />
                    </Col>
                  </Row>
                  <Row>
                    <br />
                  </Row>
                  <Row>
                    <Col md={{size: 8, offset: 2}}>
                      <label><h5>Body Text</h5></label>
                      <Field className="form-control" component="textarea" name="section2Body" />
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
            </form>
        )
    }
}

export const SupportCms = reduxForm({
    form: "supportCmsForm"
})(SupportCmsForm);
