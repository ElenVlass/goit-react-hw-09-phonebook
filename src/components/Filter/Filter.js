import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './Filter.module.scss';
import { phoneBookSelectors, changeFilter } from '../../redux/phonebook';

export default function Filter() {
  const dispatch = useDispatch();
  const filter = useSelector(phoneBookSelectors.getFilter);

  return (
    <label className={styles.label}>
      Find contacts by name
      <input
        className={styles.input}
        type="text"
        value={filter}
        onChange={e => dispatch(changeFilter(e.target.value))}
      />
    </label>
  );
}
