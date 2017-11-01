import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import IndexPage from 'routes/IndexPage';
import LoginPage from 'routes/LoginPage';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={IndexPage} />
        <Route path="/login" exact component={LoginPage} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
