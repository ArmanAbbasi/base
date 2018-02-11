import React from 'react';
import path from 'path';
import assign from 'lodash/assign';

import mapping from './mapping';

export default async ctx => {
  const match = mapping[ctx.request.path];

  if (match) {
    return assign({ }, match, {
      component: require(path.resolve(__dirname, '../views/', match.params.component)).default
    });
  }

  ctx.status = 404;
  return assign({ }, match, {
    component: require(path.resolve(__dirname, '../views/', 'NotFound')).default
  });
};