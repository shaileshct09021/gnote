import { Map } from 'immutable';
export function addImmutableNote(notes, note, index) {
  return notes && notes.set(index, Map({...note, index}));
}
