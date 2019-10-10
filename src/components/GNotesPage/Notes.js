import React from 'react';
import { Card, CardBody, CardTitle, ListGroup, ListGroupItem, Badge } from 'reactstrap';

const Notes = ({notes, handleRemoveNote}) => (
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
                  <Badge color="danger" className="remove-action" onClick={() => handleRemoveNote(index)}>Remove</Badge>
                </span>
                <p>
                  {body}
                </p>
              </ListGroupItem>
            );
          })
        }
      </ListGroup>
    </CardBody>
  </Card>
);

export default Notes;
