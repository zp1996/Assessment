import dva from 'dva';
import { browserHistory } from 'react-router';
import logger from 'redux-logger';
import { query } from 'services/example';
import './index.less';

const app = dva({
  history: browserHistory,
  onAction: [ logger ]
});

app.model(require('./models/example'));
app.model(require('./models/login'));

app.router(require('./router'));

app.start('#root');

query();
