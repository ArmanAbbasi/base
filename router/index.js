import React from 'react';
import { renderToString } from 'react-dom/server';

import viewResolver from './viewResolver';

import fetchData from '../api';

export default async ctx => {
  const View = await viewResolver(ctx);
  const data = await fetchData({
    queryId: View.params.component,
    parameters: View.params
  });

  return ctx.render('layout', {
    body: await renderToString(<View.component {...data} />),
    data,
    title: data.content.seo.title
  });
}