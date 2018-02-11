import Koa from 'koa';
import path from 'path';
import ejs from 'koa-ejs';
import winston from 'winston';

import config from '../config';
import router from '../router';

const app = new Koa();

ejs(app, {
  root: path.resolve(__dirname, '../', 'templates'),
  layout: false,
  viewExt: 'ejs',
  cache: false,
  debug: false
});

app
  .use(router)
  .listen(config.get('server.port'), err => winston[err ? 'err' : 'info'](`NodeJS instance ${err ? 'failed' : 'started'}`, {
    port: config.get('server.port'),
    hostname: config.get('server.hostname'),
    environment: config.get('server.environment')
  }));
