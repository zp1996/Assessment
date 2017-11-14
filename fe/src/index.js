import dva from 'dva';
import createHistory from 'history/createBrowserHistory';
import { query } from 'services/example';
import './index.less';

const actionPlugins = [];

if (process.env.NODE_ENV !== 'production') {
  actionPlugins.push(require('redux-logger').default);
}

const app = dva({
  history: createHistory(),
  onAction: actionPlugins,
});

app.model(require('./models/example'));
app.model(require('./models/login'));

app.router(require('./router'));

app.start('#root');

query();
