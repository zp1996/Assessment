import dva from 'dva';
import createHistory from 'history/createBrowserHistory';
import createLoading from 'dva-loading';
import './styles/index.less';

const actionPlugins = [];

if (process.env.NODE_ENV !== 'production') {
  actionPlugins.push(require('redux-logger').default);
}

const app = dva({
  history: createHistory(),
  onAction: actionPlugins,
});

app.use(createLoading());

app.model(require('./models/example'));
app.model(require('./models/login'));
app.model(require('./models/slider'));

app.router(require('./router'));

app.start('#root');
