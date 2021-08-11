import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import routes from '../../routes';
import styles from './Navigation.module.scss';
import { authSelectors } from '../../redux/authorization';

function Navigation() {
  const isAuthenticated = useSelector(authSelectors.getIsAuthenticated);

  return (
    <ul className={styles.NavList}>
      <li className={styles.List}>
        <NavLink
          to={routes.home}
          className={styles.NavLink}
          activeClassName={styles.NavLink__active}
        >
          Home
        </NavLink>
      </li>
      <li className={styles.List}>
        {/* {isAuthenticated && 
        ( */}
        <NavLink
          to={routes.contacts}
          className={styles.NavLink}
          activeClassName={styles.NavLink__active}
        >
          Phonebook
        </NavLink>
        {/* )} */}
      </li>
    </ul>
  );
}

export default Navigation;
