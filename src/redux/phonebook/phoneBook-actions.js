import { createAction } from '@reduxjs/toolkit';

export const addContactRequest = createAction('contacts/addRequest');
export const addContactSuccess = createAction('contacts/addSuccess');
export const addContactError = createAction('contacts/addErorr');

export const deleteContactRequest = createAction('contact/deleteRequest');
export const deleteContactSuccess = createAction('contact/deleteSuccess');
export const deleteContactError = createAction('contact/deleteError');

export const changeFilter = createAction('filter/change');

export const fetchContactsRequest = createAction('contacts/fetchRequest');
export const fetchContactsSuccess = createAction('contacts/fetchSuccess');
export const fetchContactsError = createAction('contacts/fetchError');
