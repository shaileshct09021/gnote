import { Map } from 'immutable';
import { addImmutableNote } from '../helpers/HelperFunctions';
const initialState = Map({
  auth       : Map({ username: 'admin', password : 'admin'}),
  isLoggedIn : false,
  notes      : Map({}),
});

const reducer = (state = initialState, action) => {
  if(action.type === 'ADD_NOTE') {
    const oldNotes = state.get('notes');
    const index    = Math.floor(Math.random() * 100);
    return state.set('notes', addImmutableNote(oldNotes, action.note, index));
  }
  else if(action.type === 'REMOVE_NOTE') {
    const oldNotes = state.get('notes');
    const newNotes = oldNotes.delete(action.id);
    return state.set('notes', newNotes);
  }
  else if (action.type === 'UPDATE_NOTE') {
    const oldNotes = state.get('notes');
    const newNotes = oldNotes.set(action.note.index, Map(action.note));
    return state.set('notes', newNotes);
  }
  else if(action.type === 'AUTHORIZE') {
    return state.set('isLoggedIn', action.status);
  }
  return state;
};

export default reducer;