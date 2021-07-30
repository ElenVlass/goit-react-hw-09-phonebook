import { createSelector } from '@reduxjs/toolkit';

const getIsLoading = state => state.phoneBook.loading;

const getFilter = state => state.phoneBook.filter;

const getAllContacts = state => state.phoneBook.contacts;

const getSpecifiedContacts = createSelector(
  [getAllContacts, getFilter],
  (contacts, filter) => {
    const normalizedContactSnippet = filter.toLowerCase();

    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(normalizedContactSnippet),
    );
  },
);

export default {
  getIsLoading,
  getFilter,
  getAllContacts,
  getSpecifiedContacts,
};

// export const getSpecifiedContacts = state => {
//     const filter = getFilter(state).toLowerCase();
//     const contacts = getAllContacts(state);

//     const normalizedContactSnippet = filter.toLowerCase();
//     return contacts.filter(({ name }) =>
//     name.toLowerCase().includes(normalizedContactSnippet)
//   );
// }
