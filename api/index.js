import fetch from 'node-fetch';
import config from '@config';

import { logger, dynamic } from '@utils';

const fetchData = async ({ queryId, parameters }) => {
  const query = await dynamic(`api/queries/${ queryId }`);

  return fetch(config.get('graphql.url'), {
    'method': 'POST',
    'headers': {
      'Content-Type': 'application/json',
      'X-Group-Locale': 'en_GB',
      'X-Group-Channel-Id': '1234',
      'X-Group-Brand': 'Photobox'
    },
    'body': JSON.stringify({
      'query': query(parameters)
    })
  })
    .then(res => res.json())
    .then(res => res.data)
    .catch(e => logger.error('Failed orchestration call', {
      'error': e
    }));
};

export default fetchData;