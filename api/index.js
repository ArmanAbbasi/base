import axios from 'axios';
import config from '@config';
import get from 'lodash/get';

import { logger, dynamic } from '@utils';

const fetchData = async ({ queryId, parameters }) => {
  const query = await dynamic(`api/queries/${ queryId }`);


  return axios({
    'url': config.get('graphql.url'),
    'method': 'POST',
    'headers': {
      'Content-Type': 'application/json',
      'X-Group-Locale': 'en_GB',
      'X-Group-Channel-Id': '1234',
      'X-Group-Brand': 'Photobox'
    },
    'data': JSON.stringify({
      'query': query(parameters)
    })
  })
    .then(({ data }) => get(data, 'data', {}))
    .catch(err => logger.error('Failed orchestration call', {
      'error': err
    }));
};

export default fetchData;