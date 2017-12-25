import React from 'react';
import { Route, Switch } from 'dva/router';
import { ConnectedRouter } from 'react-router-redux';
import IndexPage from 'routes/IndexPage';
import LoginPage from 'routes/LoginPage';
import SliderPage from 'routes/SliderPage';
import IntroductionPage from 'routes/IntroductionPage';
import NewsPage from 'routes/NewsPage';
import AddNewPage from 'routes/AddNewPage';

function RouterConfig({ history }) {
  return (
    <ConnectedRouter history={history}>
      <Switch>
        <Route path="/" exact component={IndexPage} />
        <Route path="/login" exact component={LoginPage} />
        <Route path="/slider" exact component={SliderPage} />
        <Route path="/introduction" exact component={IntroductionPage} />
        <Route path="/new" exact component={NewsPage} />
        <Route path="/addnew" exact component={AddNewPage} />
      </Switch>
    </ConnectedRouter>
  );
}

export default RouterConfig;
