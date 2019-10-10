import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CardGroup, Button } from 'reactstrap';
import { bindActionCreators } from 'redux';
import { withRouter } from "react-router-dom";

import Notes from './Notes';
import AddNote from './AddNote';

import * as GNotesActionCreator from '../../actions/GNotesActionCreator';

class GNotesPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title        : "",
      body         : "",
      invalidTitle : false,
      invalidBody  : false,
    };

    this.handleAddNoteSubmit          = this.handleAddNoteSubmit.bind(this);
    this.handleAddNoteFormFieldChange = this.handleAddNoteFormFieldChange.bind(this);
    this.validateAddNoteFormFields    = this.validateAddNoteFormFields.bind(this);
    this.handleRemoveNote             = this.handleRemoveNote.bind(this);
    this.resetAddNoteFormFields       = this.resetAddNoteFormFields.bind(this);
    this.handleLogout                 = this.handleLogout.bind(this);
  }

  componentDidMount() {
    if(!this.props.isLoggedIn) {
      this.props.history.push('/login');
    }
  }

  handleAddNoteFormFieldChange(e) {
    this.setState({
      title : e.target.name === "title" ? e.target.value : this.state.title,
      body  : e.target.name === "body" ? e.target.value : this.state.body,
    }, () => this.validateAddNoteFormFields());
  }

  handleRemoveNote(index) {
    this.props.gNotesActions.removeNote(index);
  }

  resetAddNoteFormFields() {
    this.setState({
      title        : "",
      body         : "",
      invalidTitle : false,
      invalidBody  : false,
    })
  }

  validateAddNoteFormFields() {
    this.setState({
      invalidTitle : this.state.title.trim() === "",
      invalidBody  : this.state.body.trim() === "",
    });
  }

  handleAddNoteSubmit(e) {
    e.preventDefault();
    if(this.state.title.trim() === "" || this.state.body.trim() === "") {
      this.validateAddNoteFormFields();
    }
    else {
      this.props.gNotesActions.addNote({
        title : this.state.title,
        body  : this.state.body
      });
      this.resetAddNoteFormFields();
    }
  }

  handleLogout() {
    this.props.gNotesActions.authorize(false);
    this.props.history.push('/login');
  }

  render () {
    return (
      <div className="gnotes">
        <CardGroup>
          <Notes 
            notes={this.props.notes}
            handleRemoveNote={this.handleRemoveNote}
          />
          <AddNote
            handleAddNoteSubmit={this.handleAddNoteSubmit}
            handleAddNoteFormFieldChange={this.handleAddNoteFormFieldChange}
            title={this.state.title}
            body={this.state.body}
            invalidTitle={this.state.invalidTitle}
            invalidBody={this.state.invalidBody}
          />
        </CardGroup>
        <div className="logout-action">
          <Button
            type="button"
            onClick={this.handleLogout}
          >
            Logout
          </Button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    notes      : state.get('notes'),
    isLoggedIn : state.get('isLoggedIn'),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    gNotesActions : bindActionCreators(GNotesActionCreator, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(GNotesPage));
