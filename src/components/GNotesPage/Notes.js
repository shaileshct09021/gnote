import React from 'react';
import { Card, CardBody, CardTitle, ListGroup, Alert } from 'reactstrap';
import Note from'./Note';

const Notes = ({notes, handleRemoveNote, handleEditNote}) => (
  <Card className="notes">
    <CardBody>
      <CardTitle>
        <strong>
          Notes
        </strong>
      </CardTitle>
      <ListGroup className="note-list">
        {
          notes && notes.valueSeq().map((note) => {
            const index = note.get('index');
            return <Note note={note} handleRemoveNote={handleRemoveNote} handleEditNote={handleEditNote} key={index} />;
          })
        }
        {
          notes && notes.size === 0 &&
            <Alert color="warning">
              No record found
            </Alert>
        }
      </ListGroup>
    </CardBody>
  </Card>
);

export default Notes;
