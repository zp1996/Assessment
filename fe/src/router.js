import React from 'react';
import { Route, Switch } from 'dva/router';
import { ConnectedRouter } from 'react-router-redux';
import IndexPage from 'routes/IndexPage';
import LoginPage from 'routes/LoginPage';

function RouterConfig({ history }) {
  return (
    <ConnectedRouter history={history}>
      <Switch>
        <Route path="/" exact component={IndexPage} />
        <Route path="/login" exact component={LoginPage} />
      </Switch>
    </ConnectedRouter>
  );
}

export default RouterConfig;
