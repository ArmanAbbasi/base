import assign from 'lodash/assign';

import { dynamic } from '@utils';

import { getPathObject } from './urlResolver';

export const getView = async ctx => {
  const match = getPathObject(ctx.request.path);
  const { params } = match;

  return assign({ }, match, {
    componentId: params.component,
    View: await dynamic(`views/${ params.component }`),
    params
  });
};