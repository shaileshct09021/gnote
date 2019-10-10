export function addNote(note) {
  return {
    type: 'ADD_NOTE',
    note
  }
}

export function removeNote(id) {
  return {
    type: 'REMOVE_NOTE',
    id
  }
}

export function authorize(status) {
  return {
    type: 'AUTHORIZE',
    status
  }
}
