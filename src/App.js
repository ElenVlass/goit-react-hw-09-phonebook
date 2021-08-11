import React, { Suspense, lazy, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
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

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authOperations.getCurrentUser());
  }, [dispatch]);

  return (
    <Layout>
      <Suspense fallback={<LoaderSpiner />}>
        <Switch>
          <Route path={routes.contacts} redirectTo={routes.login}>
            <PhonebookView />
          </Route>

          <PublicRoute path={routes.home} exact>
            <HomeView />
          </PublicRoute>
          <PublicRoute
            path={routes.login}
            restricted
            redirectTo={routes.contacts}
          >
            <LogInView />
          </PublicRoute>

          <PublicRoute
            path={routes.register}
            restricted
            redirectTo={routes.contacts}
          >
            <RegisterView />
          </PublicRoute>
        </Switch>
      </Suspense>
    </Layout>
  );
}
