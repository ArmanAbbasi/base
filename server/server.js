import Koa from 'koa';
import path from 'path';
import ejs from 'koa-ejs';
import serve from 'koa-static';
import compress from 'koa-compress';
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

const caching = (cacheDuration = config.get('caching.edge.duration')) => async (ctx, next) => {
  logger.info('Cache miss', {
    cache_age: cacheDuration
  });

  ctx.response.set(config.get('caching.edge.enabled') ? {
    'Cache-Control': `max-age=${ cacheDuration }`
  } : {
    'Cache-Control': 'private, no-cache, no-store, must-revalidate',
    Expires: '-1',
    Pragma: 'no-cache'
  });

  await next();
};

app
  .use(compress())
  .use(serve('./public', {
    setHeaders: res => {
      if (config.get('caching.static.enabled')) {
        res.setHeader('Cache-Control', `max-age=${ config.get('caching.static.duration') }`);
      } else {
        res.setHeader('Cache-Control', 'private, no-cache, no-store, must-revalidate');
        res.setHeader('Expires', '-1');
        res.setHeader('Pragma', 'no-cache');
      }
    }
  }))
  .use(minifier({
    collapseWhitespace: true
  }))
  .use(caching())
  .use(router)
  .listen(config.get('server.port'), err => logger[err ? 'error' : 'info'](`NodeJS instance ${ err ? 'failed' : 'started' }`, {
    port: config.get('server.port'),
    hostname: config.get('server.hostname'),
    environment: config.get('server.environment')
  }));