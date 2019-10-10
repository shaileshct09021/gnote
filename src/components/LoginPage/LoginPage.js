import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col, FormFeedback } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from "react-router-dom";
import * as GNotesActionCreator from '../../actions/GNotesActionCreator';

class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username        : "",
      password        : "",
      invalidUsername : false,
      invalidPassword : false,
    };

    this.handleLoginSubmit          = this.handleLoginSubmit.bind(this);
    this.validateLoginFormFields    = this.validateLoginFormFields.bind(this);
    this.handleLoginFormFieldChange = this.handleLoginFormFieldChange.bind(this);
  }

  componentDidMount() {
    if(this.props.isLoggedIn) {
      this.props.history.push('/home');
    }
  }

  handleLoginFormFieldChange(e) {
    this.setState({
      username : e.target.name === "username" ? e.target.value : this.state.username,
      password : e.target.name === "password" ? e.target.value : this.state.password,
    }, () => this.validateLoginFormFields());
  }

  validateLoginFormFields() {
    this.setState({
      invalidUsername : this.state.username.trim() === "",
      invalidPassword : this.state.password.trim() === "",
    });
  }

  handleLoginSubmit(e) {
    e.preventDefault();
    if(this.state.username.trim() === "" || this.state.password.trim() === "") {
      this.validateLoginFormFields();
    }
    else if(this.props.auth.get('username') === this.state.username && this.props.auth.get('password') === this.state.password){
      this.props.gNotesActions.authorize(true);
      this.props.history.push('/home');
    }
    else {
      this.props.history.push('/login');
    }
  }

  render() {
    return (
      <Container className="login">
        <Row>
          <Col sm="12" md={{ size: 6, offset: 3 }}>
            <Form>
              <FormGroup>
                <Label for="username">Username</Label>
                <Input
                  invalid={this.state.invalidUsername}
                  type="text"
                  name="username"
                  id="username"
                  value={this.state.username}
                  onChange={this.handleLoginFormFieldChange}
                />
                {this.state.invalidUsername &&
                  <FormFeedback>Username is required</FormFeedback>
                }
              </FormGroup>
              <FormGroup>
                <Label for="password">Password</Label>
                <Input
                  invalid={this.state.invalidPassword}
                  type="password"
                  name="password"
                  id="password"
                  value={this.state.password}
                  onChange={this.handleLoginFormFieldChange}
                />
                {this.state.invalidPassword &&
                  <FormFeedback>Password is required</FormFeedback>
                }
              </FormGroup>
              <Button
                type="button"  
                onClick={this.handleLoginSubmit}
                disabled={this.state.invalidUsername || this.state.invalidPassword}
              >
                Login
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn : state.get('isLoggedIn'),
    auth       : state.get('auth')
  };
};

const mapDispatchToProps = dispatch => {
  return {
    gNotesActions : bindActionCreators(GNotesActionCreator, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(LoginPage));
