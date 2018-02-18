import React from 'react';
import fetchData from '@api';

import { renderToString } from 'react-dom/server';
import { dynamic, logger } from '@utils';

import { isPathAvailable } from './urlResolver';
import { getView } from './viewResolver';

export default async (ctx, next) => {
  try {
    await next();

    if (!isPathAvailable(ctx.request.path)) {
      const NotFoundError = await dynamic('views/NotFound');

      ctx.status = 404;

      logger.error('Page Not Found', {
        error: ctx.request
      });

      return ctx.render('layout', {
        body: renderToString(<NotFoundError />),
        title: 'Page Not Found'
      });
    }
    const { componentId, View, params } = await getView(ctx);

    const data = await fetchData({
      queryId: componentId,
      parameters: params
    });

    return ctx.render('layout', {
      body: await renderToString(<View { ...data } />),
      data,
      title: data.content.seo.title
    });
  } catch (error) {
    const ServerError = await dynamic('views/ServerError');

    ctx.status = 500;

    logger.error('Server Error', {
      error
    });

    return ctx.render('layout', {
      body: renderToString(<ServerError />),
      title: 'Server Error'
    });
  }
};