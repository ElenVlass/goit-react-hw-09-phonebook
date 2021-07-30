import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import styles from './ContactList.module.scss';
import LoaderSpiner from '../Loader';
import { phoneBookSelectors, operations } from '../../redux/phonebook';

export default function ContactList({ children, ...allysProps }) {
  const dispatch = useDispatch();

  const onDelete = id => dispatch(operations.deleteContact(id));
  const list = useSelector(phoneBookSelectors.getSpecifiedContacts);
  const isLoading = useSelector(phoneBookSelectors.getIsLoading);

  const onFetchContacts = useCallback(
    () => dispatch(operations.fetchContacts()),
    [dispatch],
  );
  useEffect(() => onFetchContacts(), [onFetchContacts]);

  return (
    <>
      {isLoading && <LoaderSpiner />}
      <ul className={styles.list}>
        {list.map(({ id, name, number }) => (
          <li key={id} className={styles.item}>
            <span className={styles.name}>
              {name}: {number}
            </span>
            <button
              className={styles.button}
              type="button"
              onClick={() => onDelete(id)}
              {...allysProps}
            >
              {children}
              <span className={styles.span}>Delete</span>
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

ContactList.propTypes = {
  'aria-label': PropTypes.string.isRequired,
};
