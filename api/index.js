import fetch from 'node-fetch';
import path from 'path';

import config from '../config';
import { logger } from '../utils';

const fetchData = async ({ queryId, parameters }) => {
  const query = require(path.resolve(__dirname, './queries', queryId)).default;

  return fetch(config.get('graphql.url'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Group-Locale': 'en_GB',
      'X-Group-Channel-Id': '1234',
      'X-Group-Brand': 'Photobox'
    },
    body: JSON.stringify({
      query: query(parameters)
    })
  })
    .then(res => res.json())
    .then(res => res.data)
    .catch(e => logger.error('Failed orchestration call', e));
};

export default fetchData;