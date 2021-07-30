const getIsAuthenticated = state => state.authorization.isAuthenticated;

const getUsername = state => state.authorization.user.name;

export default { getIsAuthenticated, getUsername };
