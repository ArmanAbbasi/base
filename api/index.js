import fetch from 'node-fetch';
import path from 'path';

import config from '../config';

const fetchData = async ({ queryId, parameters }) => {
  const query = require(path.resolve(__dirname, './queries', queryId)).default;

  return await fetch(config.get('graphql.url'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Group-Locale': 'en_GB',
      'X-Group-Channel-Id': '1234',
      'X-Group-Brand': 'Photobox'
    },
    body: JSON.stringify({
      query: query(parameters)
    }),
  })
  .then(res => res.json())
  .then(res => res.data)
  .catch(e => console.log(e))
};

export default fetchData;