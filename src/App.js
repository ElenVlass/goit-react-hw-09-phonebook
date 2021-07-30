import { Component, Suspense, lazy } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import LoaderSpiner from './components/Loader';
import Layout from './components/Layout';
import routes from './routes';
import { authOperations } from './redux/authorization';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';

const HomeView = lazy(() =>
  import('./views/HomeView.js' /* webpackChunkName: "home-view" */),
);
const PhonebookView = lazy(() =>
  import('./views/PhonebookView.js' /* webpackChunkName: "phonebook-view" */),
);
const LogInView = lazy(() =>
  import('./views/LogInView.js' /* webpackChunkName: "login-view" */),
);
const RegisterView = lazy(() =>
  import('./views/RegisterView.js' /* webpackChunkName: "register-view" */),
);

class App extends Component {
  componentDidMount() {
    this.props.onRefreshUser();
  }

  render() {
    return (
      <Layout>
        <Suspense fallback={<LoaderSpiner />}>
          <Switch>
            <PrivateRoute
              path={routes.contacts}
              component={PhonebookView}
              redirectTo={routes.login}
            />
            <PublicRoute path={routes.home} exact component={HomeView} />
            <PublicRoute
              path={routes.login}
              restricted
              component={LogInView}
              redirectTo={routes.contacts}
            />
            <PublicRoute
              path={routes.register}
              restricted
              component={RegisterView}
              redirectTo={routes.contacts}
            />
          </Switch>
        </Suspense>
      </Layout>
    );
  }
}

const mapDispatchToProps = {
  onRefreshUser: authOperations.getCurrentUser,
};

export default connect(null, mapDispatchToProps)(App);
