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
      isEditMode   : false,
    };

    this.handleAddNoteSubmit          = this.handleAddNoteSubmit.bind(this);
    this.handleAddNoteFormFieldChange = this.handleAddNoteFormFieldChange.bind(this);
    this.validateAddNoteFormFields    = this.validateAddNoteFormFields.bind(this);
    this.handleRemoveNote             = this.handleRemoveNote.bind(this);
    this.resetAddNoteFormFields       = this.resetAddNoteFormFields.bind(this);
    this.handleLogout                 = this.handleLogout.bind(this);
    this.handleEditNote               = this.handleEditNote.bind(this);
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
    this.resetAddNoteFormFields();
  }

  resetAddNoteFormFields() {
    this.setState({
      title        : "",
      body         : "",
      invalidTitle : false,
      invalidBody  : false,
      isEditMode   : false,
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
      if(!!this.state.isEditMode) {
        this.props.gNotesActions.updateNote({
          title : this.state.title,
          body  : this.state.body,
          index : this.state.isEditMode
        });
      }
      else {
        this.props.gNotesActions.addNote({
          title : this.state.title,
          body  : this.state.body
        });
      }
      this.resetAddNoteFormFields();
    }
  }

  handleLogout() {
    this.props.gNotesActions.authorize(false);
    this.props.history.push('/login');
  }

  handleEditNote(index) {
    const note = this.props.notes.get(index)
    this.setState({
      title        : note.get('title'),
      body         : note.get('body'),
      invalidTitle : false,
      invalidBody  : false,
      isEditMode   : index,
    })
  }

  render () {
    return (
      <div className="gnotes">
        <CardGroup>
          <AddNote
            handleAddNoteSubmit={this.handleAddNoteSubmit}
            handleAddNoteFormFieldChange={this.handleAddNoteFormFieldChange}
            title={this.state.title}
            body={this.state.body}
            invalidTitle={this.state.invalidTitle}
            invalidBody={this.state.invalidBody}
            isEditMode={this.state.isEditMode}
          />
          <Notes
            notes={this.props.notes}
            handleRemoveNote={this.handleRemoveNote}
            handleEditNote={this.handleEditNote}
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
