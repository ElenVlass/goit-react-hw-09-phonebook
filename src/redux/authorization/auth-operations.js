import axios from 'axios';
import authActions from './auth-actions';

axios.defaults.baseURL = 'https://connections-api.herokuapp.com/';

const token = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = '';
  },
};

const register = credentials => async dispatch => {
  dispatch(authActions.registerRequest());

  try {
    const { data } = await axios.post('/users/signup', credentials);

    token.set(data.token);
    dispatch(authActions.registerSuccess(data));
  } catch (error) {
    dispatch(authActions.registerError(error.message));
  }
};

const logIn = credentials => async dispatch => {
  dispatch(authActions.logInRequest());

  try {
    const { data } = await axios.post('/users/login', credentials);

    token.set(data.token);
    dispatch(authActions.logInSuccess(data));
  } catch (error) {
    dispatch(authActions.logInError(error.message));
  }
};

const logOut = () => async dispatch => {
  dispatch(authActions.logOutRequest());

  try {
    await axios.post('/users/logout');

    token.unset();
    dispatch(authActions.logOutSuccess());
  } catch (error) {
    dispatch(authActions.logOutError(error.message));
  }
};

const getCurrentUser = () => async (dispatch, getState) => {
  const {
    authorization: { token: persistedToken },
  } = getState();

  if (!persistedToken) {
    return;
  }

  token.set(persistedToken);
  dispatch(authActions.getCurrentUserRequest());

  try {
    const { data } = await axios.get('/users/current');

    dispatch(authActions.getCurrentUserSuccess(data));
  } catch (error) {
    dispatch(authActions.getCurrentUserError(error.message));
  }
};

export default { register, logIn, logOut, getCurrentUser };
