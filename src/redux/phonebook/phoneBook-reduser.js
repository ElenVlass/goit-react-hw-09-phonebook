import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';
import * as actions from './phoneBook-actions';

const {
  addContactRequest,
  addContactSuccess,
  addContactError,
  deleteContactRequest,
  deleteContactSuccess,
  deleteContactError,
  fetchContactsRequest,
  fetchContactsSuccess,
  fetchContactsError,
} = actions;

const contacts = createReducer([], {
  [addContactSuccess]: (state, action) => [...state, action.payload],
  [deleteContactSuccess]: (state, { payload }) =>
    state.filter(contact => contact.id !== payload),
  [fetchContactsSuccess]: (_, { payload }) => payload,
});

const filter = createReducer('', {
  [actions.changeFilter]: (_, { payload }) => payload,
});

const loading = createReducer(false, {
  [addContactRequest]: () => true,
  [addContactSuccess]: () => false,
  [addContactError]: () => false,
  [deleteContactRequest]: () => true,
  [deleteContactSuccess]: () => false,
  [deleteContactError]: () => false,
  [fetchContactsRequest]: () => true,
  [fetchContactsSuccess]: () => false,
  [fetchContactsError]: () => false,
});

const error = createReducer(null, {
  [addContactError]: (_, { payload }) => console.log(payload),
  [deleteContactError]: (_, { payload }) => console.log(payload),
  [fetchContactsError]: (_, { payload }) => console.log(payload),
});

export default combineReducers({ contacts, filter, loading, error });
