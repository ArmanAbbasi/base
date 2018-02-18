import Koa from 'koa';
import path from 'path';
import ejs from 'koa-ejs';
import serve from 'koa-static';
import gzip from 'koa-gzip';
import minifier from 'koa-html-minifier';

import config from '@config';
import router from '@router';

import { logger } from '@utils';

const app = new Koa();

ejs(app, {
  root: path.resolve(__dirname, '../', 'templates'),
  layout: false,
  viewExt: 'ejs',
  cache: false,
  debug: false
});

app
  .use(gzip())
  .use(serve('./public'))
  .use(minifier({
    collapseWhitespace: true
  }))
  .use(router)
  .listen(config.get('server.port'), err => logger[err ? 'error' : 'info'](`NodeJS instance ${ err ? 'failed' : 'started' }`, {
    port: config.get('server.port'),
    hostname: config.get('server.hostname'),
    environment: config.get('server.environment')
  }));