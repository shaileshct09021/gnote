import React from 'react';
import {
	Button, Form, FormGroup, Label, Input, Card, CardBody, CardTitle, FormFeedback
} from 'reactstrap';

const AddNote = ({
	handleAddNoteSubmit, handleAddNoteFormFieldChange, title, body,
	invalidTitle, invalidBody
}) => (
	<Card>
		<CardBody>
			<CardTitle>Add Note</CardTitle>
			<Form>
				<FormGroup>
					<Label for="title">Title</Label>
					<Input
						invalid={invalidTitle}
						type="text"
						name="title"
						id="title"
						value={title}
						onChange={handleAddNoteFormFieldChange}
					/>
					{invalidTitle &&
					  <FormFeedback>Title is required</FormFeedback>
					}
				</FormGroup>
				<FormGroup>
					<Label for="body">Body</Label>
					<Input
						invalid={invalidBody}
						type="textarea"
						name="body"
						id="body"
						value={body}
						onChange={handleAddNoteFormFieldChange}
					/>
					{invalidBody &&
					  <FormFeedback>Body is required</FormFeedback>
					}
				</FormGroup>
				<Button
					type="button"
					onClick={handleAddNoteSubmit}
					disabled={invalidTitle || invalidBody}
				>
					Save
				</Button>
			</Form>
		</CardBody>
	</Card>
);

export default AddNote;
