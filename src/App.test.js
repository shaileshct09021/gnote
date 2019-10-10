import React from 'react';
import { Map } from 'immutable';
import { addImmutableNote } from './helpers/HelperFunctions';

describe('addImmutableNote', () => {
  const noteJs = {title : 'test', body: 'test'};
  const notes = Map({});
  const immutableNote = Map({title : 'test', body: 'test', index: "1"});
  it('notes is undefined', () => {
    expect(addImmutableNote(undefined, noteJs, "1"))
    .toBe(undefined);
  });
  it('notes is null', () => {
    expect(addImmutableNote(null, noteJs, "1"))
    .toBe(null);
  });
  it('notes is Empty Map', () => {
    expect(addImmutableNote(notes, noteJs, "1"))
    .toStrictEqual(Map({ 1: immutableNote}));
  });
  it('notes is defined', () => {
    expect(addImmutableNote(notes, noteJs, "1"))
    .toStrictEqual(Map({ 1: immutableNote}));
  });
});