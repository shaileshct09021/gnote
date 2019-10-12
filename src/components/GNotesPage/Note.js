import React from 'react';
import { ListGroupItem, Badge, Row, Col } from 'reactstrap';

const Notes = ({note, handleEditNote, handleRemoveNote}) => {
  const index = note.get('index');
  const title = note.get('title');
  const body  = note.get('body');
  return (
    <ListGroupItem className="note-item">
      <Row>
        <Col xs="12" sm="8" md="8" lg="8">
          <strong>{title}</strong>
          <p>
            {body}
          </p>
        </Col>
        <Col xs="12" sm="4" md="4" lg="4">
          <div className="actions">
            <Badge color="primary" className="edit-action" onClick={() => handleEditNote(index)}>Edit</Badge>
            <Badge color="danger" className="remove-action" onClick={() => handleRemoveNote(index)}>Remove</Badge>
          </div>
        </Col>
      </Row>
    </ListGroupItem>
  );
}

export default Notes;
