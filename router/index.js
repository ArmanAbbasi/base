import React from 'react';
import { renderToString } from 'react-dom/server';

import viewResolver from './viewResolver';

import fetchData from '../api';

export default async ctx => {
  const { componentId, Instance, params } = await viewResolver(ctx);
  if (!Instance) { return; }

  const data = await fetchData({
    queryId: componentId,
    parameters: params
  });

  await ctx.render('layout', {
    body: await renderToString(<Instance { ...data } />),
    data,
    title: data.content.seo.title
  });
};