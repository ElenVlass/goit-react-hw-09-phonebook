import React, { useState } from 'react';
import styles from './PhonebookForm.module.scss';
import { operations, phoneBookSelectors } from '../../redux/phonebook';
import { useSelector, useDispatch } from 'react-redux';

function PhonebookForm({ children, ...allyProps }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const allContacts = useSelector(phoneBookSelectors.getAllContacts);
  const dispatch = useDispatch();

  const handleChange = evt => {
    const { name, value } = evt.target;

    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'number':
        setNumber(value);
        break;

      default:
        console.log(`The ${name} of input form is incorrect`);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();

    isNameExist()
      ? alert('This contact already exist')
      : dispatch(operations.addContact({ name, number }));

    resetFormField();
  };

  const resetFormField = () => {
    setName('');
    setNumber('');
  };

  const isNameExist = () => {
    return allContacts.find(contact => contact.name === name);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label className={styles.label}>
        Name
        <input
          className={styles.input}
          type="text"
          name="name"
          value={name}
          onChange={handleChange}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
          required
        />
      </label>
      <label className={styles.label}>
        Number
        <input
          className={styles.input}
          type="tel"
          name="number"
          value={number}
          onChange={handleChange}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
          required
        />
      </label>
      <button className={styles.button} type="submit" {...allyProps}>
        {children}
        <span className={styles.span}>Add contact</span>
      </button>
    </form>
  );
}

export default PhonebookForm;
