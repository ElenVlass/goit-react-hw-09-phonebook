import React from 'react';
import { connect } from 'react-redux';
import defaultAvatar from '../../icons/login.png';
import styles from './UserMenu.module.scss';
import { authSelectors } from '../../redux/authorization';
import { authOperations } from '../../redux/authorization';

const UserMenu = ({ avatar, name, onLogout }) => (
  <div className={styles.UserMenu}>
    <img src={avatar} alt="" width="32" />
    <span className={styles.UserName}>Welcome, {name}</span>
    <button type="button" onClick={onLogout} className={styles.button}>
      Logout
    </button>
  </div>
);

const mapStateToProps = state => ({
  avatar: defaultAvatar,
  name: authSelectors.getUsername(state),
});
const mapDispatchToProps = dispatch => ({
  onLogout: () => dispatch(authOperations.logOut()),
});
export default connect(mapStateToProps, mapDispatchToProps)(UserMenu);
