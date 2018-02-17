import React from 'react';
import path from 'path';
import assign from 'lodash/assign';

import mapping from './mapping.json';

export default async ctx => {
  const match = mapping[ctx.request.path];

  if (match) {
    const { params } = match;

    return assign({ }, match, {
      componentId: params.component,
      Instance: require(path.resolve(__dirname, '../views/', params.component)).default,
      params
    });
  }

  ctx.status = 404;
  return assign({ }, match, {
    component: require(path.resolve(__dirname, '../views/', 'NotFound')).default
  });
};