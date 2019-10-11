import React from 'react';
import { Card, CardBody, CardTitle, ListGroup, ListGroupItem, Badge, Alert } from 'reactstrap';

const Notes = ({notes, handleRemoveNote, handleEditNote}) => (
  <Card className="notes">
    <CardBody>
      <CardTitle>Notes</CardTitle>
      <ListGroup className="note-list">
        {
          notes && notes.valueSeq().map((note) => {
            const index = note.get('index');
            const title = note.get('title');
            const body  = note.get('body');
            return (
              <ListGroupItem key={index} className="note-item">
                <span>
                  <strong>{title}</strong>
                  <div className="actions">
                    <Badge color="primary" className="edit-action" onClick={() => handleEditNote(index)}>Edit</Badge>
                    <Badge color="danger" className="remove-action" onClick={() => handleRemoveNote(index)}>Remove</Badge>
                  </div>
                </span>
                <p>
                  {body}
                </p>
              </ListGroupItem>
            );
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
